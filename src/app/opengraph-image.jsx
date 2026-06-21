import { ImageResponse } from "next/og";

export const alt = "Dupgen Sherpa — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a08",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "#c8ff00",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 12,
              color: "#0a0a08",
            }}
          >
            DS
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(240,236,224,0.45)",
            }}
          >
            Portfolio · 2026
          </span>
        </div>

        {/* Middle: name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "#f0ece0",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
            }}
          >
            DUPGEN
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "transparent",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              WebkitTextStroke: "3px #f0ece0",
            }}
          >
            SHERPA.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(240,236,224,0.1)",
            paddingTop: 24,
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "rgba(240,236,224,0.45)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Software Engineer · Java · Spring Boot · React
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              background: "rgba(200,255,0,0.12)",
              border: "1px solid rgba(200,255,0,0.3)",
              borderRadius: 100,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#c8ff00",
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#c8ff00",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Open to work
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
