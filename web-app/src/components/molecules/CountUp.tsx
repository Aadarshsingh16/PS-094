"use client";

import { useEffect, useState } from "react";

export function CountUp({ from, to }: { from: number; to: number }) {
  const [shown, setShown] = useState(from);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      setShown(Math.round(from + (to - from) * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [from, to]);

  return <>{shown}</>;
}
