"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

/* ─── Cloud configs — larger sizes, 2 left + 2 right ──────────────────── */
const CLOUD_CONFIGS = [
  { src: "/images/cloud1.png", w: 270, h: 174, floatOpts: { baseTopVh: 4,  baseLeftVw: 1,  amplitude: 8,  speed: 0.4,  phase: 0   } },
  { src: "/images/cloud2.png", w: 320, h: 192, floatOpts: { baseTopVh: 19, baseLeftVw: 4,  amplitude: 12, speed: 0.5,  phase: 1.5 } },
  { src: "/images/cloud1.png", w: 250, h: 160, floatOpts: { baseTopVh: 5,  baseLeftVw: 66, amplitude: 8,  speed: 0.35, phase: 3   } },
  { src: "/images/cloud2.png", w: 300, h: 180, floatOpts: { baseTopVh: 21, baseLeftVw: 74, amplitude: 10, speed: 0.45, phase: 4.5 } },
] as const;

function FloatingCloud({ src, w, h, floatOpts }: (typeof CLOUD_CONFIGS)[number]) {
  const pos = useCloudFloat(floatOpts);
  return (
    <div className="absolute pointer-events-none select-none" style={{ top: pos.top, left: pos.left, zIndex: 6 }}>
      <Image src={src} alt="Cloud" width={w} height={h} priority />
    </div>
  );
}

/* ─── Menu items ───────────────────────────────────────────────────────── */
const MENU_ITEMS = [
  { label: "Events",       href: "/events"   },
  { label: "Gallery",      href: "/gallery"  },
  { label: "Project Hall", href: "/projects" },
  { label: "Credits",      href: "/about-us" },
];

/* ─── Retro selector arrow — blinks like an old-school game cursor ─────── */
const RetroArrow = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <motion.span
        key="arrow"
        aria-hidden
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: [1, 0, 1, 0, 1], x: 0 }}
        exit={{ opacity: 0, x: -6 }}
        transition={{ opacity: { duration: 0.6, repeat: Infinity, repeatDelay: 0.4 }, x: { duration: 0.15 } }}
        style={{
          display: "inline-block",
          width: "1.2em",
          flexShrink: 0,
          color: "#fff700",
          textShadow: "1px 1px 0 #886600",
        }}
      >▶</motion.span>
    )}
    {!active && (
      <span aria-hidden style={{ display: "inline-block", width: "1.2em", flexShrink: 0, opacity: 0 }}>▶</span>
    )}
  </AnimatePresence>
);

/* ─── Page ─────────────────────────────────────────────────────────────── */
const LandingPage = () => {
  const router = useRouter();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [animStep, setAnimStep] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);

  /* Leaderboard animation sequence */
  useEffect(() => {
    if (!showLeaderboard) { setAnimStep(0); return; }
    const t1 = setTimeout(() => setAnimStep(1), 0);
    const t2 = setTimeout(() => setAnimStep(2), 1000);
    const t3 = setTimeout(() => setAnimStep(3), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [showLeaderboard]);

  /* ── Keyboard navigation (Up / Down / Enter) ────────────────────────── */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx(i => (i + 1) % MENU_ITEMS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx(i => (i - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(MENU_ITEMS[selectedIdx].href);
    }
  }, [selectedIdx, router]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const lbSrc = animStep >= 3 ? "/3RD.png" : animStep >= 2 ? "/2ND.png" : animStep >= 1 ? "/1ST.png" : null;

  return (
    <div
      className="w-full h-screen relative overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg,#1188EE 0%,#0E8AEA 24.52%,#1093EB 35.07%,#1197EC 45.67%,#16B6F4 52.35%,#10CBF1 56.04%,#0FC6F1 59.73%,#15DEF0 64.76%,#15DEF0 81.25%)",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0, opacity: 0.08,
          backgroundImage: "linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Social icons — transparent background, no pink accent */}
      <div className="absolute top-4 right-5 z-50 flex items-center gap-2">
        {[
          { href: "https://www.instagram.com/microsoft.innovations.vitc/",           src: "/insta_pixel.svg",    alt: "Instagram" },
          { href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/", src: "/linkedin_pixel.svg", alt: "LinkedIn"  },
          { href: "mailto:mic.vit.chennai@gmail.com",                                  src: "/mail_pixel.svg",    alt: "Email"     },
        ].map(({ href, src, alt }) => (
          <a
            key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}
            className="Animated-Logo flex items-center justify-center"
            style={{
              background: "transparent",
              width: "clamp(36px,4.5vw,50px)",
              height: "clamp(36px,4.5vw,50px)",
              padding: "2px",
            }}
          >
            <Image src={src} alt={`${alt} Logo`} width={48} height={48}
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

      {/* Floating clouds — larger */}
      {CLOUD_CONFIGS.map((cfg, i) => <FloatingCloud key={i} {...cfg} />)}

      {/* Big cloud backdrop */}
      <div className="absolute left-0 right-0 pointer-events-none select-none"
        style={{ bottom: "72px", height: "40vh", backgroundImage: "url('/big_cloud.svg')", backgroundRepeat: "repeat-x", backgroundPosition: "bottom", backgroundSize: "auto 100%", zIndex: 2 }}
      />

      {/* Cityscape */}
      <div className="absolute left-0 right-0 pointer-events-none select-none"
        style={{ bottom: "72px", height: "28vh", backgroundImage: "url('/cityscape.svg')", backgroundRepeat: "repeat-x", backgroundPosition: "bottom", backgroundSize: "auto 100%", zIndex: 3 }}
      />

      {/* Bushes */}
      <div className="absolute left-0 right-0 pointer-events-none select-none"
        style={{ bottom: "72px", height: "16vh", backgroundImage: "url('/pixel_bushes.svg')", backgroundRepeat: "repeat-x", backgroundPosition: "bottom", backgroundSize: "auto 100%", zIndex: 4 }}
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

      {/* ──────────────────────────────────────────────────────────────────
          CENTRAL COLUMN: ropes → signboard (bigger) → menu (centred)
          - Signboard width bumped to clamp(320px, 54vw, 700px)
          - Font size bumped to clamp(1rem, 3.8vw, 3.2rem)
          - Menu centred with items-center
          - Keyboard nav: ArrowUp/Down to move, Enter to navigate
          - Retro blinking ▶ cursor on active item (yellow, like NES menus)
      ────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none"
        style={{ top: 0, width: "clamp(320px, 54vw, 700px)", zIndex: 29 }}
      >
        {/* Ropes — spaced to match larger board width */}
        <div className="relative w-full flex justify-between px-[8%]" style={{ height: "clamp(80px, 11vh, 130px)" }}>
          <div className="relative" style={{ width: 14, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Left rope" fill className="object-top object-contain" />
          </div>
          <div className="relative" style={{ width: 14, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Right rope" fill className="object-top object-contain" />
          </div>
        </div>

        {/* Signboard — larger */}
        <div className="relative w-full pointer-events-auto" style={{ aspectRatio: "895 / 455" }}>
          <Image src="/signboard.svg" alt="Signboard" fill className="object-contain" priority />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <h1
              className="text-[#FCD7CE] font-bold uppercase leading-snug font-press-start"
              style={{
                fontSize: "clamp(1rem, 3.8vw, 3.2rem)",
                textShadow: "4px 4px 0 #4d2304,-2px -2px 0 #4d2304,2px -2px 0 #4d2304,-2px 2px 0 #4d2304,2px 2px 0 #4d2304",
                letterSpacing: "0.05em",
              }}
            >
              M!CROSOFT<br />!NNOVAT!ONS<br />CLUB.
            </h1>
          </div>
        </div>

        {/* Navigation — centred, keyboard-navigable, retro blinking cursor */}
        <nav
          aria-label="Main navigation"
          className="font-press-start pointer-events-auto w-full flex flex-col items-center"
          style={{
            marginTop: "clamp(8px, 1.3vh, 20px)",
            gap: "clamp(5px, 0.95vh, 13px)",
            display: "flex",
          }}
        >
          {MENU_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              animate={selectedIdx === idx ? { scale: [1, 1.04, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, repeat: selectedIdx === idx ? Infinity : 0, ease: "easeInOut" }}
            >
              <Link
                href={item.href}
                onMouseEnter={() => setSelectedIdx(idx)}
                className="flex items-center gap-1"
                style={{
                  fontSize: "clamp(11px, 1.5vw, 19px)",
                  color: selectedIdx === idx ? "#fff" : "#1a5ce0",
                  textShadow: selectedIdx === idx
                    ? "1px 1px 0 #003399, -1px -1px 0 #003399, 0 0 8px rgba(255,255,100,0.4)"
                    : "1px 1px 0 rgba(255,255,255,0.8), -1px -1px 0 rgba(255,255,255,0.5)",
                  fontWeight: 700,
                  transition: "color 0.15s, text-shadow 0.15s",
                }}
              >
                <RetroArrow active={selectedIdx === idx} />
                <span>{item.label}</span>
              </Link>
            </motion.div>
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