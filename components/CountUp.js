"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({ value, duration = 1800 }) {
  const text = String(value ?? "");
  const m = text.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[2].replace(/,/g, "")) : 0;
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setN(target);
      return;
    }

    let raf = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        setN(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setN(target);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ref.current);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text]);

  if (!m) return <>{text}</>;

  const decimals = (m[2].split(".")[1] || "").length;
  const shown = n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: m[2].includes(","),
  });

  return (
    <span ref={ref}>
      <span aria-hidden="true" className="tabular-nums">
        {m[1]}
        {shown}
        {m[3]}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}