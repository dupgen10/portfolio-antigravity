#!/usr/bin/env node

/**
 * Spotify Refresh Token Generator
 * 
 * Run this script ONCE to get your refresh token:
 *   node scripts/get-spotify-token.mjs
 * 
 * Prerequisites:
 *   1. Go to https://developer.spotify.com/dashboard
 *   2. Create a new app
 *   3. Set the Redirect URI to: http://localhost:3333/callback
 *   4. Copy your Client ID and Client Secret
 *   5. Run this script and paste them when prompted
 */

import http from "node:http";
import { URL } from "node:url";
import readline from "node:readline/promises";

const REDIRECT_URI = "http://localhost:3333/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function main() {
  console.log("\n🎵 Spotify Refresh Token Generator\n");
  console.log("Before starting, make sure you've created a Spotify app at:");
  console.log("  https://developer.spotify.com/dashboard\n");
  console.log(`Set the Redirect URI to: ${REDIRECT_URI}\n`);

  const clientId = await rl.question("Paste your Client ID: ");
  const clientSecret = await rl.question("Paste your Client Secret: ");

  const authUrl =
    `https://accounts.spotify.com/authorize?` +
    `client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&scope=${encodeURIComponent(SCOPES)}`;

  console.log("\n🔗 Open this URL in your browser:\n");
  console.log(authUrl);
  console.log("\nWaiting for callback...\n");

  // Start a temporary local server to catch the callback
  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:3333`);
      const authCode = url.searchParams.get("code");
      const error = url.searchParams.get("error");

      if (error) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>❌ Authorization denied.</h1><p>You can close this tab.</p>");
        server.close();
        reject(new Error(error));
        return;
      }

      if (authCode) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>✅ Got it!</h1><p>Go back to the terminal.</p>");
        server.close();
        resolve(authCode);
      }
    });

    server.listen(3333, () => {
      console.log("🖥  Local server listening on http://localhost:3333 ...");
    });
  });

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
      redirect_uri: REDIRECT_URI,
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
  console.log("\nAlso add these as Environment Variables in your Vercel dashboard:");
  console.log("  Settings → Environment Variables → Add each one\n");

  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
