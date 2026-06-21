"use client";

import { useState, useEffect } from "react";

const STATS = [
  { key: "stars",      label: "Stars"      },
  { key: "forks",      label: "Forks"      },
  { key: "openIssues", label: "Issues"     },
  { key: "language",   label: "Language"   },
];

export default function GitHubStats() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then(r => r.ok ? r.json() : null)
      .then(json => { setData(json); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const val = (key) => loading ? "—" : (data?.[key] ?? "N/A");

  return (
    <div
      style={{
        background: "var(--ink-3)",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "10px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--lime)",
          opacity: 0.7,
        }}
      >
        ⬤ Live from GitHub
      </span>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {STATS.map(({ key, label }) => (
          <div key={key} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "var(--lime)",
                fontVariantNumeric: "tabular-nums",
                opacity: loading ? 0.4 : 1,
                transition: "opacity 0.3s",
              }}
            >
              {val(key)}
            </span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
