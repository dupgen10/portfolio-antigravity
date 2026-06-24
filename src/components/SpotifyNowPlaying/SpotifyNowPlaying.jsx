"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpotifyNowPlaying() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) throw new Error();
        const json = await res.json();
        if (mounted) setData(json);
      } catch {
        if (mounted) setData(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // poll every 30s
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  // Don't render if Spotify isn't configured
  if (!loading && (!data || !data.configured)) return null;

  const hasTrack = data?.title;
  const isPlaying = data?.isPlaying;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="spotify-widget"
    >
      {/* Spotify icon + label */}
      <div className="spotify-header">
        <svg className="spotify-icon" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span className="spotify-label">
          {loading ? "Connecting..." : isPlaying ? "Now Playing" : hasTrack ? "Last Played" : "Offline"}
        </span>

        {/* Equalizer bars — only when playing */}
        {isPlaying && (
          <div className="eq-bars">
            <span className="eq-bar" style={{ animationDelay: "0s" }} />
            <span className="eq-bar" style={{ animationDelay: "0.15s" }} />
            <span className="eq-bar" style={{ animationDelay: "0.3s" }} />
          </div>
        )}
      </div>

      {/* Track info */}
      <AnimatePresence mode="wait">
        {hasTrack ? (
          <motion.a
            key={data.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.3 }}
            href={data.songUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-track"
          >
            {/* Album art */}
            {data.albumArt && (
              <img
                src={data.albumArt}
                alt={data.album}
                className="spotify-art"
                width={40}
                height={40}
              />
            )}
            <div className="spotify-meta">
              <span className="spotify-title">{data.title}</span>
              <span className="spotify-artist">{data.artist}</span>
            </div>
          </motion.a>
        ) : loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="spotify-track"
          >
            <div className="spotify-art-skeleton" />
            <div className="spotify-meta">
              <span className="spotify-title" style={{ opacity: 0.3 }}>—</span>
              <span className="spotify-artist" style={{ opacity: 0.3 }}>—</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
