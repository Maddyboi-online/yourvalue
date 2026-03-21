"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  life: number;
};

export default function CustomCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      idRef.current += 1;

      const nextParticle: Particle = {
        id: idRef.current,
        x: e.clientX,
        y: e.clientY,
        life: 1,
      };

      particlesRef.current = [...particlesRef.current.slice(-14), nextParticle];
    };

    const tick = () => {
      particlesRef.current = particlesRef.current
        .map((p) => ({ ...p, life: p.life - 0.06 }))
        .filter((p) => p.life > 0)
        .slice(-15);
      setParticles(particlesRef.current);

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {particles.map((particle) => {
        const t = Math.max(0, Math.min(1, particle.life));
        const size = 9 * t + 2;
        const isHot = t > 0.5;
        const color = isHot ? "#FF6B00" : "#FFD700";

        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-[9998] rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              opacity: t,
              boxShadow: `0 0 ${10 * t}px ${color}`,
            }}
          />
        );
      })}
    </>
  );
}
