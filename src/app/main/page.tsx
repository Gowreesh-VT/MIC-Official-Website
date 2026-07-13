"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Floating cloud hook ──────────────────────────────────────────────── */
interface CloudFloatOptions {
  baseTopVh: number;
  baseLeftVw: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({
  baseTopVh, baseLeftVw, amplitude = 10, speed = 0.4, phase = 0,
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
    return () => { running = false; };
  }, [amplitude, speed, phase]);

  return {
    top: `calc(${baseTopVh}vh + ${offset}px)`,
    left: `${baseLeftVw}vw`,
  };
}

/* ─── Cloud configs (2 left, 2 right, upper sky only) ─────────────────── */
const CLOUD_CONFIGS = [
  { src: "/images/cloud1.png", w: 190, h: 122, floatOpts: { baseTopVh: 5,  baseLeftVw: 2,  amplitude: 8,  speed: 0.4,  phase: 0   } },
  { src: "/images/cloud2.png", w: 230, h: 138, floatOpts: { baseTopVh: 18, baseLeftVw: 5,  amplitude: 12, speed: 0.5,  phase: 1.5 } },
  { src: "/images/cloud1.png", w: 175, h: 112, floatOpts: { baseTopVh: 6,  baseLeftVw: 68, amplitude: 8,  speed: 0.35, phase: 3   } },
  { src: "/images/cloud2.png", w: 215, h: 129, floatOpts: { baseTopVh: 20, baseLeftVw: 76, amplitude: 10, speed: 0.45, phase: 4.5 } },
] as const;

function FloatingCloud({ src, w, h, floatOpts }: (typeof CLOUD_CONFIGS)[number]) {
  const pos = useCloudFloat(floatOpts);
  return (
    <div className="absolute pointer-events-none select-none" style={{ top: pos.top, left: pos.left, zIndex: 6 }}>
      <Image src={src} alt="Cloud" width={w} height={h} priority />
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
const MENU_ITEMS = [
  { label: "Events",       href: "/events"   },
  { label: "Gallery",      href: "/gallery"  },
  { label: "Project Hall", href: "/projects" },
  { label: "Credits",      href: "/about-us" },
];

const LandingPage = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [animStep, setAnimStep] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0); // first item highlighted by default

  useEffect(() => {
    if (!showLeaderboard) { setAnimStep(0); return; }
    const t1 = setTimeout(() => setAnimStep(1), 0);
    const t2 = setTimeout(() => setAnimStep(2), 1000);
    const t3 = setTimeout(() => setAnimStep(3), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [showLeaderboard]);

  const lbSrc = animStep >= 3 ? "/3RD.png" : animStep >= 2 ? "/2ND.png" : animStep >= 1 ? "/1ST.png" : null;

  return (
    <div
      className="w-full h-screen relative overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg,#1188EE 0%,#0E8AEA 24.52%,#1093EB 35.07%,#1197EC 45.67%,#16B6F4 52.35%,#10CBF1 56.04%,#0FC6F1 59.73%,#15DEF0 64.76%,#15DEF0 81.25%)",
      }}
    >
      {/* FIX 2: Grid overlay — opacity reduced from 20% → 8% so it's subtle, not dominant */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.08,
          backgroundImage: "linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* FIX 4: Social icons — wrapped in pixel-art style square buttons with pastel backgrounds */}
      <div className="absolute top-4 right-5 z-50 flex items-center gap-2">
        {[
          { href: "https://www.instagram.com/microsoft.innovations.vitc/",           src: "/insta_pixel.svg",    alt: "Instagram", bg: "#f0d8e8" },
          { href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/", src: "/linkedin_pixel.svg", alt: "LinkedIn",  bg: "#d8e8f8" },
          { href: "mailto:mic.vit.chennai@gmail.com",                                  src: "/mail_pixel.svg",    alt: "Email",     bg: "#dce8dc" },
        ].map(({ href, src, alt, bg }) => (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={alt}
            className="Animated-Logo flex items-center justify-center"
            style={{
              background: bg,
              border: "3px solid #222",
              borderRadius: "4px",
              width: "clamp(36px,4.5vw,50px)",
              height: "clamp(36px,4.5vw,50px)",
              padding: "4px",
              imageRendering: "pixelated",
            }}
          >
            <Image src={src} alt={`${alt} Logo`} width={32} height={32}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} priority />
          </a>
        ))}
      </div>

      {/* Trophy / leaderboard */}
      {!showLeaderboard && (
        <button
          id="trophy-icon" type="button" aria-label="Show leaderboard"
          className="fixed z-50 hover:scale-110 transition-transform duration-200"
          style={{ bottom: 90, left: 24 }}
          onClick={() => setShowLeaderboard(true)}
        >
          <Image src="/cup_home.svg" alt="Leaderboard" width={44} height={48} priority />
        </button>
      )}
      <AnimatePresence>
        {showLeaderboard && lbSrc && (
          <motion.div
            className="fixed z-50" style={{ left: 24, bottom: 95, cursor: "pointer" }}
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => { setShowLeaderboard(false); setAnimStep(0); }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={lbSrc} initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <Image src={lbSrc} alt="Leaderboard" width={200} height={280} style={{ imageRendering: "pixelated", display: "block" }} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4 floating small clouds (upper sky only) */}
      {CLOUD_CONFIGS.map((cfg, i) => <FloatingCloud key={i} {...cfg} />)}

      {/* Big cloud backdrop (z:2, above gradient, below everything else) */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "72px",
          height: "40vh",
          backgroundImage: "url('/big_cloud.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 2,
        }}
      />

      {/* Cityscape */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "72px",
          height: "28vh",
          backgroundImage: "url('/cityscape.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 3,
        }}
      />

      {/* Bushes */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "72px",
          height: "16vh",
          backgroundImage: "url('/pixel_bushes.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 4,
        }}
      />

      {/* Bobbing bird */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ right: "12%", top: "20%", width: 56, height: 45, zIndex: 8 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/pixel_bird.svg" alt="Pixel Bird" fill className="object-contain" style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* ── CENTRAL COLUMN: ropes → signboard → menu ─────────────────────
          Single flex-col container ensures menu ALWAYS appears below board.
          FIX 1: Menu now guaranteed to be in the clear-sky zone.
          FIX 3: Signboard text is larger (3vw vs 2.6vw).
          FIX 6: First menu item always shows ▶ arrow (not just on hover).
          FIX 7: Menu text has white drop-shadow for contrast on any bg.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none"
        style={{
          top: 0,
          width: "clamp(280px, 44vw, 560px)",
          zIndex: 29,
        }}
      >
        {/* Ropes */}
        <div className="relative w-full flex justify-between px-[9%]" style={{ height: "clamp(80px, 11vh, 130px)" }}>
          <div className="relative" style={{ width: 13, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Left rope" fill className="object-top object-contain" />
          </div>
          <div className="relative" style={{ width: 13, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Right rope" fill className="object-top object-contain" />
          </div>
        </div>

        {/* Signboard */}
        <div className="relative w-full pointer-events-auto" style={{ aspectRatio: "895 / 455" }}>
          <Image src="/signboard.svg" alt="Signboard" fill className="object-contain" priority />
          {/* FIX 3: Larger text to fill the board more prominently */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <h1
              className="text-[#FCD7CE] font-bold uppercase leading-snug font-press-start"
              style={{
                fontSize: "clamp(0.8rem, 3vw, 2.4rem)",
                textShadow: "3px 3px 0 #4d2304,-2px -2px 0 #4d2304,2px -2px 0 #4d2304,-2px 2px 0 #4d2304,2px 2px 0 #4d2304",
                letterSpacing: "0.04em",
              }}
            >
              M!CROSOFT<br />!NNOVAT!ONS<br />CLUB.
            </h1>
          </div>
        </div>

        {/* Navigation menu — flows naturally below board, in clear sky area */}
        <nav
          aria-label="Main navigation"
          className="font-press-start pointer-events-auto w-full"
          style={{
            marginTop: "clamp(8px, 1.2vh, 18px)",
            paddingLeft: "clamp(8px, 3vw, 20px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(5px, 0.9vh, 12px)",
          }}
        >
          {MENU_ITEMS.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              onMouseEnter={() => setActiveMenu(idx)}
              className="group flex items-center gap-2 transition-transform duration-200 hover:translate-x-1"
              style={{
                fontSize: "clamp(11px, 1.45vw, 18px)",
                /* FIX 7: White text-shadow for contrast on any background */
                textShadow: "1px 1px 0 rgba(255,255,255,0.9), -1px -1px 0 rgba(255,255,255,0.6)",
                color: "#0d6eff",
                fontWeight: 700,
              }}
            >
              {/* FIX 6: Arrow always shows for active item, fades in for others on hover */}
              <span
                style={{
                  opacity: activeMenu === idx ? 1 : 0,
                  transition: "opacity 0.15s",
                  display: "inline-block",
                  width: "1em",
                  flexShrink: 0,
                  color: "#0d6eff",
                }}
                aria-hidden
              >▶</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Ground ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
        style={{ height: "72px", background: "#CC9339", borderTop: "8px solid #589B00", zIndex: 40 }}
      >
        <div className="relative flex overflow-x-hidden w-full pointer-events-none">
          <div
            className="animate-marquee whitespace-nowrap flex uppercase tracking-widest font-press-start"
            style={{ color: "#5E3A00", fontSize: "clamp(10px,1.3vw,14px)" }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;