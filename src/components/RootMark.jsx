import React, { useEffect, useRef, useState } from "react";

// The site's signature element: a root-canal-file line drawing that reads as
// both a tooth root (the product) and a tree root (the brand name). It draws
// itself in once, whenever it scrolls into view — reused in the hero, section
// dividers, and empty states so it functions as a recurring mark rather than
// a one-off hero graphic.
const PATHS = [
  "M110 8 V52",
  "M110 52 C 90 66, 70 61, 40 94",
  "M110 52 C 130 66, 150 61, 182 91",
  "M110 52 V92",
  "M40 94 C 25 107, 20 121, 14 147",
  "M40 94 C 46 111, 44 127, 38 149",
  "M182 91 C 196 105, 200 119, 206 145",
  "M182 91 C 176 109, 178 127, 184 149",
  "M110 92 C 96 111, 96 127, 88 151",
  "M110 92 C 124 111, 124 127, 132 151",
];

export default function RootMark({ className = "", accent = true, size = "100%" }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 160"
      width={size}
      height={size}
      className={className}
      fill="none"
      role="img"
      aria-label="Root-canal file line illustration"
    >
      <g stroke="#1E4640" strokeWidth="2.5" strokeLinecap="round">
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            className={`root-path ${drawn ? "is-drawn" : ""}`}
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </g>
      {accent && <circle cx="110" cy="8" r="6" fill="#C65B36" />}
    </svg>
  );
}
