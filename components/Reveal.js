"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, from = "up", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const left = from === "left";
  const hidden = left ? "-translate-x-16 opacity-0" : "translate-y-6 opacity-0";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all ease-out ${left ? "duration-1000" : "duration-700"} ${
        shown ? "translate-x-0 translate-y-0 opacity-100" : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
}