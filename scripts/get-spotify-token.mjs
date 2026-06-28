#!/usr/bin/env node

/**
 * Spotify Refresh Token Generator (Manual Flow)
 * 
 * Run: node scripts/get-spotify-token.mjs
 */

import readline from "node:readline/promises";

const SCOPES = "user-read-currently-playing user-read-recently-played";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function main() {
  console.log("\n🎵 Spotify Refresh Token Generator\n");

  const clientId = (await rl.question("Paste your Client ID: ")).trim();
  const clientSecret = (await rl.question("Paste your Client Secret: ")).trim();
  const redirectUri = (await rl.question("Paste the Redirect URI you registered in Spotify (e.g. https://google.com): ")).trim();

  const authUrl =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${clientId}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(SCOPES)}`;

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔗 Open this URL in your browser:\n");
  console.log(authUrl);
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\nAfter you authorize, Spotify will redirect you.");
  console.log("Look at the URL bar — it will look something like:");
  console.log("  https://google.com/?code=AQDx7s...very_long_string\n");
  console.log("Copy EVERYTHING after '?code=' (the long string)\n");

  const code = (await rl.question("Paste the code here: ")).trim();

  // Exchange code for tokens
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    console.error("\n❌ Error:", tokenData.error_description || tokenData.error);
    process.exit(1);
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ Success! Add these to your .env.local file:\n");
  console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
  console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}`);
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\nAlso add these as Environment Variables in Vercel:");
  console.log("  Settings → Environment Variables → Add each one\n");

  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
