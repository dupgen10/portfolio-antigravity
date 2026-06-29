"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Simple time ago formatter to avoid heavy dependencies
function timeAgo(dateString) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return "just now";
}

export default function Footprints() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const fetchFootprints = async () => {
    try {
      const res = await fetch("/api/footprints");
      const data = await res.json();
      if (res.ok) setEntries(data.entries || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFootprints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/footprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, note }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      // Success
      setName("");
      setNote("");
      // Add immediately to top
      setEntries([data.entry, ...entries]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Your name"
            maxLength={24}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-transparent border rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--lime)] transition-colors cursor-none"
            style={{ borderColor: "var(--border-2)" }}
          />
          <button 
            type="submit" 
            disabled={submitting || !name.trim()}
            className="btn-primary !px-4 !py-2 !gap-1"
          >
            {submitting ? <Loader2 size={14} className="animate-spin" /> : "Leave a trace"}
          </button>
        </div>
        <input
          type="text"
          placeholder="Leave a note (optional)"
          maxLength={80}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full bg-transparent border rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--lime)] transition-colors cursor-none"
          style={{ borderColor: "var(--border-2)" }}
        />
        {error && <span className="text-red-400 text-[10px] mt-1 uppercase tracking-wider">{error}</span>}
      </form>

      {/* List */}
      <div className="flex-1 overflow-y-auto pr-1 min-h-[120px] max-h-[160px] scrollbar-hide space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 size={16} className="animate-spin text-[var(--muted)]" />
          </div>
        ) : entries.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-[var(--muted)]">
            No footprints yet. Be the first.
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="text-sm border-l-2 pl-3 py-1" style={{ borderColor: "var(--border-2)" }}>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-white">{entry.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  {timeAgo(entry.created_at)}
                </span>
              </div>
              {entry.note && (
                <p className="text-[var(--ivory-dim)] text-xs mt-1 leading-relaxed break-words">
                  "{entry.note}"
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
