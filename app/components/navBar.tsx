import React, { useEffect, useRef, useState } from "react";
import ShimmerButton from "./subcomponents/shimmerTile";
import { motion } from "motion/react";

interface NowPlaying {
  playing: boolean;
  title: string;
  artist: string;
  album: string;
  artwork_url: string;
  duration_ms: number;
  position_ms: number;
  state_ts_ms: number;
}

const NavBar: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [progress, setProgress] = useState(0);
  const dataRef = useRef<NowPlaying | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(
          "https://server.nilgiri-exponential.ts.net/music/now-playing",
        );
        const data: NowPlaying = await res.json();
        setNowPlaying(data);
        dataRef.current = data;
      } catch {
        setNowPlaying(null);
        dataRef.current = null;
      }
    };

    fetchNowPlaying();
    const fetchInterval = setInterval(fetchNowPlaying, 10000);

    const progressInterval = setInterval(() => {
      const d = dataRef.current;
      if (d?.playing && d.duration_ms > 0) {
        const elapsed = Date.now() - d.state_ts_ms;
        const current = Math.min(d.position_ms + elapsed, d.duration_ms);
        setProgress((current / d.duration_ms) * 100);
        if (d.duration_ms - current <= 3000) {
          fetchNowPlaying();
        }
      }
    }, 500);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 h-20 bg-gray-800/90 backdrop-blur z-50 flex items-center justify-between px-6">
      <style>{`
        @keyframes eq-bar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.3); }
        }
      `}</style>
      <img
        className="h-12"
        src="https://raw.githubusercontent.com/Firebolt9907/firebolt9907.github.io/main/assets/myPics/signature.webp"
        alt="My Signature"
        onClick={() => {
          window.location.href = "https://rishitsharma.netlify.app/home";
        }}
      />
      <nav className="flex items-center gap-4">
        <ShimmerButton
          content={<h3>Contact Me</h3>}
          tile={false}
          handleClick={() => {
            window.location.href = "mailto:rishushar99@gmail.com";
          }}
        />
        {nowPlaying?.playing && (
          <motion.div
            className="flex items-center gap-2 rounded-xl px-3 py-2 max-w-xs overflow-hidden relative"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Blurred artwork background */}
            {nowPlaying.artwork_url && (
              <div
                className="absolute inset-0 scale-110"
                style={{
                  backgroundImage: `url(${nowPlaying.artwork_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(12px) brightness(0.35)",
                }}
              />
            )}
            {nowPlaying.artwork_url && (
              <img
                src={nowPlaying.artwork_url}
                alt="album art"
                className="h-9 w-9 rounded-lg object-cover flex-shrink-0 relative"
              />
            )}
            <div className="flex flex-col overflow-hidden min-w-0 relative">
              <div className="flex items-center gap-1.5 mb-0.5">
                {/* Equalizer bars */}
                <div className="flex items-end gap-px h-3 flex-shrink-0">
                  {[
                    { delay: 0, height: "100%" },
                    { delay: 0.2, height: "70%" },
                    { delay: 0.1, height: "85%" },
                  ].map((bar, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-green-400 rounded-sm origin-bottom"
                      animate={{ scaleY: [1, 0.3, 1] }}
                      transition={{
                        duration: 0.9,
                        delay: bar.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ height: bar.height }}
                    />
                  ))}
                </div>
                <span className="text-white text-xs font-semibold truncate leading-tight">
                  {nowPlaying.title}
                </span>
              </div>
              <span className="text-gray-400 text-xs truncate leading-tight mb-1">
                {nowPlaying.artist}
              </span>
              {/* Progress bar */}
              <div className="w-full h-0.5 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
