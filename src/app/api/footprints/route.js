import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Use a simple local array if Upstash is not configured yet
const isConfigured = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = isConfigured ? Redis.fromEnv() : null;

// Ratelimit: 2 requests per 60 seconds
const ratelimit = isConfigured
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(2, "60 s"),
      analytics: false,
    })
  : null;

// Lightweight blocklist
const BLOCKED_WORDS = ["fuck", "shit", "bitch", "asshole", "cunt", "nigger", "nigga", "faggot", "spic", "chink", "slut", "whore"];
const profanityRegex = new RegExp(`\\b(${BLOCKED_WORDS.join("|")})\\b`, "i");

// Fallback in-memory store if Redis not configured
let localEntries = [];

export async function GET() {
  try {
    if (isConfigured) {
      // Fetch latest 20 from Redis list
      const entries = await redis.lrange("portfolio:footprints", 0, 19);
      return NextResponse.json({ entries });
    } else {
      return NextResponse.json({ entries: localEntries });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch footprints" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    if (isConfigured) {
      const { success } = await ratelimit.limit(`ratelimit_${ip}`);
      if (!success) {
        return NextResponse.json({ error: "Rate limit exceeded. Try again in a minute." }, { status: 429 });
      }
    }

    const { name, note } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const cleanName = name.trim().slice(0, 24);
    const cleanNote = note ? String(note).trim().slice(0, 80) : "";

    // Basic profanity check
    if (profanityRegex.test(cleanName) || profanityRegex.test(cleanNote)) {
      return NextResponse.json({ error: "Please keep it family-friendly." }, { status: 400 });
    }

    // Strip basic HTML/script tags
    if (/[<>]/.test(cleanName) || /[<>]/.test(cleanNote)) {
      return NextResponse.json({ error: "Invalid characters." }, { status: 400 });
    }

    const newEntry = {
      id: crypto.randomUUID(),
      name: cleanName,
      note: cleanNote,
      created_at: new Date().toISOString(),
    };

    if (isConfigured) {
      await redis.lpush("portfolio:footprints", newEntry);
      // Keep list at 50 max
      await redis.ltrim("portfolio:footprints", 0, 49);
    } else {
      localEntries.unshift(newEntry);
      if (localEntries.length > 50) localEntries.pop();
    }

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
