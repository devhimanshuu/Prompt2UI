"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════ */
/*  PRISMATIC LIQUID V2 — Ultra-Interactive Background      */
/*  Features: Magnetism, Ripples, 3D Parallax, Sparkles    */
/* ═══════════════════════════════════════════════════════ */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  opacity: number;
  depth: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const InteractiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const targetRef = useRef({ x: 50, y: 50 });
  const rafRef = useRef<number>(0);

  const [mounted, setMounted] = useState(false);
  const [shards, setShards] = useState<any[]>([]);
  const [sparkles, setSparkles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);

    // 💎 Generate shards on mount
    setShards(Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 80,
      rotation: Math.random() * 360,
      speed: 0.3 + Math.random() * 0.8,
      opacity: 0.04 + Math.random() * 0.06,
      depth: 0.5 + Math.random() * 1.5,
    })));

    // ✨ Generate sparkles on mount
    setSparkles(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: 0.1 + Math.random() * 0.3,
      opacity: Math.random() * 0.3 + 0.1,
    })));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    targetRef.current = { x, y };
    if (!isHovering) setIsHovering(true);
  }, [isHovering]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const id = Date.now();
    setRipples(prev => [...prev.slice(-4), { id, x, y }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1000);
  }, []);

  useEffect(() => {
    const animate = () => {
      setMousePos((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.06,
        y: prev.y + (targetRef.current.y - prev.y) * 0.06,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseMove, handleMouseDown]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden -z-20 bg-background perspective-1000"
    >
      {/* 🌌 LAYER 1: Deep Morphing Aurora */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 blur-[90px] scale-110"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aurora-grad-v2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path fill="url(#aurora-grad-v2)">
          <animate
            attributeName="d"
            dur="30s"
            repeatCount="indefinite"
            values="
              M0 0 C20 10 40 -10 60 10 C80 30 100 0 100 0 V100 C80 90 60 110 40 90 C20 70 0 100 0 100 Z;
              M0 0 C30 -20 50 20 70 -10 C90 0 100 20 100 20 V100 C70 120 50 80 30 110 C10 100 0 80 0 80 Z;
              M0 0 C20 10 40 -10 60 10 C80 30 100 0 100 0 V100 C80 90 60 110 40 90 C20 70 0 100 0 100 Z
            "
          />
        </path>
      </svg>

      {/* 🕸️ LAYER 2: Grid with Magnetic Distortions */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] dark:opacity-[0.1]">
        <defs>
          <pattern id="grid-v2" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-v2)" />
        {/* Spotlight area reveal with grid warping feel */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-v2)"
          className="text-primary"
          style={{
            maskImage: `radial-gradient(circle var(--spotlight-radius, 450px) at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle var(--spotlight-radius, 450px) at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`,
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.8s ease'
          }}
        />
      </svg>

      {/* ✨ LAYER 3: Interstellar Dust (Follows mouse with drag) */}
      {mounted && sparkles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white transition-transform duration-[1500ms] ease-out shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            transform: `translate(${(mousePos.x - p.x) * p.speed * 2}px, ${(mousePos.y - p.y) * p.speed * 2}px) scale(${isHovering ? 1.2 : 1})`,
          }}
        />
      ))}

      {/* 💎 LAYER 4: Interactive Glass Shards (3D Tilt) */}
      {mounted && shards.map((shard) => {
        const dx = mousePos.x - shard.x;
        const dy = mousePos.y - shard.y;
        const tiltX = dy * 0.15;
        const tiltY = -dx * 0.15;

        return (
          <div
            key={shard.id}
            className="absolute border border-white/10 backdrop-blur-[3px] transition-all duration-700 ease-out"
            style={{
              left: `${shard.x}%`,
              top: `${shard.y}%`,
              width: `${shard.size}px`,
              height: `${shard.size}px`,
              opacity: shard.opacity,
              borderRadius: "20% 80% 30% 70% / 60% 30% 70% 40%",
              transform: `
                translate3d(${(mousePos.x - 50) * shard.speed * 0.5}px, ${(mousePos.y - 50) * shard.speed * 0.5}px, 0) 
                rotateX(${tiltX}deg) 
                rotateY(${tiltY}deg) 
                rotateZ(${shard.rotation}deg)
              `,
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
            }}
          />
        );
      })}

      {/* 🌊 LAYER 5: Click Shockwaves */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full border border-primary/40 animate-out fade-out zoom-out-[300%] duration-1000 ease-out"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            width: '400px',
            height: '400px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, transparent 40%, oklch(0.70 0.19 15 / 0.1) 100%)',
          }}
        />
      ))}

      {/* 🔥 LAYER 6: Cursor Bloom Glow */}
      <div
        className="absolute w-[60vmax] h-[60vmax] rounded-full pointer-events-none transition-all duration-500 ease-out mix-blend-screen"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle at center, 
            oklch(0.75 0.14 195 / 0.1) 0%, 
            oklch(0.70 0.19 15 / 0.05) 30%, 
            transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* 🎯 LAYER 7: Precise Cursor Ring */}
      <div
        className="absolute w-12 h-12 rounded-full border border-primary/20 transition-all duration-300 pointer-events-none"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0})`,
          boxShadow: '0 0 20px oklch(0.70 0.19 15 / 0.1)',
        }}
      />

      {/* ☄️ LAYER 8: Shooting Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div
          className="absolute w-[200%] h-px bg-linear-to-r from-transparent via-primary/50 to-transparent animate-shimmer-sweep"
          style={{ top: '15%', transform: 'rotate(-10deg) translateX(-50%)' }}
        />
        <div
          className="absolute w-[200%] h-px bg-linear-to-r from-transparent via-accent/50 to-transparent animate-shimmer-sweep"
          style={{ top: '75%', transform: 'rotate(-10deg) translateX(-50%)', animationDelay: '3.5s' }}
        />
      </div>

      {/* 🎚️ LAYER 9: Static Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none grayscale"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.6' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
