const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

async function getAccessToken() {
  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  // If env vars aren't set, return a graceful "not configured" response
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return Response.json(
      { isPlaying: false, configured: false },
      {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" },
      }
    );
  }

  try {
    const accessToken = await getAccessToken();

    // Try currently playing first
    const nowRes = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    // 204 = nothing playing right now
    if (nowRes.status === 204) {
      // Fall back to recently played
      const recentRes = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });

      if (!recentRes.ok) {
        return Response.json(
          { isPlaying: false, configured: true },
          { status: 200, headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15" } }
        );
      }

      const recentData = await recentRes.json();
      const track = recentData.items?.[0]?.track;

      if (!track) {
        return Response.json(
          { isPlaying: false, configured: true },
          { status: 200, headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15" } }
        );
      }

      return Response.json(
        {
          isPlaying: false,
          configured: true,
          title: track.name,
          artist: track.artists.map((a) => a.name).join(", "),
          album: track.album.name,
          albumArt: track.album.images?.[0]?.url || null,
          songUrl: track.external_urls.spotify,
        },
        { status: 200, headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15" } }
      );
    }

    if (!nowRes.ok) {
      return Response.json(
        { isPlaying: false, configured: true },
        { status: 200, headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15" } }
      );
    }

    const data = await nowRes.json();

    // Could be a podcast or ad
    if (data.currently_playing_type !== "track") {
      return Response.json(
        { isPlaying: true, configured: true, title: "Listening to a podcast", artist: "", album: "", albumArt: null, songUrl: null },
        { status: 200, headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15" } }
      );
    }

    const track = data.item;

    return Response.json(
      {
        isPlaying: data.is_playing,
        configured: true,
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        album: track.album.name,
        albumArt: track.album.images?.[0]?.url || null,
        songUrl: track.external_urls.spotify,
      },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=10" } }
    );
  } catch (err) {
    console.error("Spotify API error:", err);
    return Response.json(
      { isPlaying: false, configured: true, error: true },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" } }
    );
  }
}
