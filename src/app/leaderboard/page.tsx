'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LeaderboardSignboard } from './_components/LeaderboardSignboard';

// 1. Cloud Floating Hook (replicated from main page)
interface CloudFloatOptions {
  baseTopVh: number;
  baseLeftVw: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({
  baseTopVh,
  baseLeftVw,
  amplitude = 10,
  speed = 0.4,
  phase = 0,
}: CloudFloatOptions) {
  const [offset, setOffset] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    let running = true;
    const animate = () => {
      frameRef.current += 1;
      setOffset(Math.sin((frameRef.current / 60) * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => {
      running = false;
    };
  }, [amplitude, speed, phase]);

  return {
    top: `calc(${baseTopVh}vh + ${offset}px)`,
    left: `${baseLeftVw}vw`,
  };
}

const CLOUD_CONFIGS = [
  { src: '/images/cloud1.png', w: 270, h: 174, floatOpts: { baseTopVh: 4, baseLeftVw: 1, amplitude: 8, speed: 0.4, phase: 0 } },
  { src: '/images/cloud2.png', w: 320, h: 192, floatOpts: { baseTopVh: 19, baseLeftVw: 4, amplitude: 12, speed: 0.5, phase: 1.5 } },
  { src: '/images/cloud1.png', w: 250, h: 160, floatOpts: { baseTopVh: 5, baseLeftVw: 66, amplitude: 8, speed: 0.35, phase: 3 } },
  { src: '/images/cloud2.png', w: 300, h: 180, floatOpts: { baseTopVh: 21, baseLeftVw: 74, amplitude: 10, speed: 0.45, phase: 4.5 } },
] as const;

function FloatingCloud({ src, w, h, floatOpts }: (typeof CLOUD_CONFIGS)[number]) {
  const pos = useCloudFloat(floatOpts);
  return (
    <div className="absolute pointer-events-none select-none" style={{ top: pos.top, left: pos.left, zIndex: 6 }}>
      <Image src={src} alt="Cloud" width={w} height={h} priority style={{ height: 'auto' }} />
    </div>
  );
}

const LeaderboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-full h-screen relative overflow-hidden select-none"
      style={{
        background:
          'linear-gradient(180deg,#1188EE 0%,#0E8AEA 24.52%,#1093EB 35.07%,#1197EC 45.67%,#16B6F4 52.35%,#10CBF1 56.04%,#0FC6F1 59.73%,#15DEF0 64.76%,#15DEF0 81.25%)',
      }}
    >
      {/* Retro 3D Close Button SVG Asset */}
      <Link
        href="/main"
        className="absolute top-6 right-6 z-50 transition-transform active:translate-y-0.5"
        style={{
          width: 'clamp(36px, 4vw, 48px)',
          height: 'auto',
          cursor: 'pointer',
        }}
      >
        <Image 
          src="/close_button.svg" 
          alt="Close" 
          width={82} 
          height={78} 
          className="object-contain" 
          priority
        />
      </Link>

      {/* Floating clouds */}
      {CLOUD_CONFIGS.map((cfg, i) => (
        <FloatingCloud key={i} {...cfg} />
      ))}

      {/* Big cloud backdrop */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: '72px',
          height: '40vh',
          backgroundImage: "url('/big_cloud.svg')",
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%',
          zIndex: 2,
        }}
      />

      {/* Cityscape */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: '72px',
          height: '28vh',
          backgroundImage: "url('/cityscape.svg')",
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%',
          zIndex: 3,
        }}
      />

      {/* Bushes */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: '62px',
          height: '16vh',
          backgroundImage: "url('/pixel_bushes.svg')",
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%',
          zIndex: 4,
        }}
      />

      {/* Bobbing bird */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ right: '12%', top: '20%', width: 56, height: 45, zIndex: 8 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image src="/pixel_bird.svg" alt="Pixel Bird" fill className="object-contain" style={{ imageRendering: 'pixelated' }} />
      </motion.div>

      {/* ── CENTRAL COLUMN: ropes → signboard ─────────── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none"
        style={{ top: 0, width: 'clamp(320px, 62vw, 840px)', zIndex: 29 }}
      >
        {/* Ropes */}
        <div className="relative w-full flex justify-between px-[12%]" style={{ height: 'clamp(120px, 16vh, 220px)' }}>
          <div className="relative" style={{ width: 14, height: '100%' }}>
            <Image src="/hanging_ropes.svg" alt="Left rope" fill className="object-top object-contain" />
          </div>
          <div className="relative" style={{ width: 14, height: '100%' }}>
            <Image src="/hanging_ropes.svg" alt="Right rope" fill className="object-top object-contain" />
          </div>
        </div>

        {/* Signboard containing the Leaderboard */}
        {isLoading ? (
          <div className="animate-pulse text-center z-20 mt-10">
            <div
              className="text-xl font-bold font-press-start animate-bounce"
              style={{ color: '#fff', fontFamily: "'Press Start 2P', monospace", textShadow: '2px 2px 0 #000' }}
            >
              LOADING LEADERBOARD...
            </div>
          </div>
        ) : (
          <div className="w-full transition-opacity duration-500 ease-in opacity-100">
            <LeaderboardSignboard />
          </div>
        )}
      </div>

      {/* Ground ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
        style={{ height: '72px', background: '#CC9339', borderTop: '8px solid #589B00', zIndex: 40 }}
      >
        <div className="relative flex overflow-x-hidden w-full pointer-events-none">
          <div
            className="animate-marquee whitespace-nowrap flex uppercase tracking-widest font-press-start"
            style={{ color: '#5E3A00', fontSize: 'clamp(10px,1.3vw,14px)' }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mx-8">
                MICROSOFT INNOVATIONS CLUB TENURE 2026-2027
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;