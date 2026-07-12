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

/* ─── Cloud configs (2 left, 2 right, all in upper sky only) ──────────── */
const CLOUD_CONFIGS = [
  { src: "/images/cloud1.png", w: 190, h: 122, floatOpts: { baseTopVh: 6,  baseLeftVw: 2,  amplitude: 8,  speed: 0.4, phase: 0   } },
  { src: "/images/cloud2.png", w: 230, h: 138, floatOpts: { baseTopVh: 20, baseLeftVw: 5,  amplitude: 12, speed: 0.5, phase: 1.5 } },
  { src: "/images/cloud1.png", w: 175, h: 112, floatOpts: { baseTopVh: 7,  baseLeftVw: 68, amplitude: 8,  speed: 0.35, phase: 3  } },
  { src: "/images/cloud2.png", w: 215, h: 129, floatOpts: { baseTopVh: 22, baseLeftVw: 76, amplitude: 10, speed: 0.45, phase: 4.5 } },
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
const LandingPage = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  const MENU_ITEMS = [
    { label: "Events",       href: "/events"   },
    { label: "Gallery",      href: "/gallery"  },
    { label: "Project Hall", href: "/projects" },
    { label: "Credits",      href: "/about-us" },
  ];

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
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: "linear-gradient(to right,rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.4) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Social icons (top-right) ─────────────────────────────────────── */}
      <div className="absolute top-4 right-5 z-50 flex items-center gap-2">
        {[
          { href: "https://www.instagram.com/microsoft.innovations.vitc/", src: "/insta_pixel.svg", alt: "Instagram" },
          { href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/", src: "/linkedin_pixel.svg", alt: "LinkedIn" },
          { href: "mailto:mic.vit.chennai@gmail.com", src: "/mail_pixel.svg", alt: "Email" },
        ].map(({ href, src, alt }) => (
          <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
            <Image className="Animated-Logo" src={src} alt={`${alt} Logo`} width={48} height={48}
              style={{ width: "clamp(34px,4.5vw,48px)", height: "auto", display: "block" }} priority />
          </a>
        ))}
      </div>

      {/* ── Trophy / leaderboard ─────────────────────────────────────────── */}
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

      {/* ── 4 floating small clouds ─────────────────────────────────────── */}
      {CLOUD_CONFIGS.map((cfg, i) => <FloatingCloud key={i} {...cfg} />)}

      {/* ── Big cloud backdrop ───────────────────────────────────────────── */}
      {/* z:2 — sits above gradient but behind everything else */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "72px",
          height: "45vh",
          backgroundImage: "url('/big_cloud.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 2,
        }}
      />

      {/* ── Cityscape ────────────────────────────────────────────────────── */}
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
          opacity: 1,
        }}
      />

      {/* ── Bushes ───────────────────────────────────────────────────────── */}
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

      {/* ── Bird ─────────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ right: "12%", top: "22%", width: 56, height: 45, zIndex: 8 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/pixel_bird.svg" alt="Pixel Bird" fill className="object-contain" style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* ── CENTRAL COLUMN: ropes + signboard + menu ─────────────────────── */}
      {/*                                                                      */}
      {/* This single flex column eliminates the menu-behind-board bug:        */}
      {/* everything stacks naturally and the menu ALWAYS appears below board. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none"
        style={{
          top: 0,
          width: "clamp(280px, 46vw, 580px)",
          zIndex: 29,
        }}
      >
        {/* Ropes */}
        <div className="relative w-full flex justify-between px-[9%]" style={{ height: "clamp(80px,12vh,140px)" }}>
          <div className="relative" style={{ width: 13, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Left rope" fill className="object-top object-contain" />
          </div>
          <div className="relative" style={{ width: 13, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Right rope" fill className="object-top object-contain" />
          </div>
        </div>

        {/* Signboard (reduced size) */}
        <div className="relative w-full pointer-events-auto" style={{ aspectRatio: "895 / 455" }}>
          <Image src="/signboard.svg" alt="Signboard" fill className="object-contain" priority />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <h1
              className="text-[#FCD7CE] font-bold uppercase leading-snug font-press-start"
              style={{
                fontSize: "clamp(0.7rem, 2.6vw, 2rem)",
                textShadow: "3px 3px 0 #4d2304,-2px -2px 0 #4d2304,2px -2px 0 #4d2304,-2px 2px 0 #4d2304,2px 2px 0 #4d2304",
              }}
            >
              M!CROSOFT<br />!NNOVAT!ONS<br />CLUB.
            </h1>
          </div>
        </div>

        {/* Navigation menu — directly below the board, always visible */}
        <div
          className="font-press-start pointer-events-auto w-full"
          style={{
            marginTop: "clamp(10px, 1.5vh, 20px)",
            paddingLeft: "clamp(8px, 3vw, 24px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(6px, 1.1vh, 14px)",
            color: "#1575f0",
            fontSize: "clamp(11px, 1.5vw, 19px)",
          }}
        >
          {MENU_ITEMS.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex items-center gap-2 hover:translate-x-2 transition-transform duration-200"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">▶</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Ground ticker ────────────────────────────────────────────────── */}
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