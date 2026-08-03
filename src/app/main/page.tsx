"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";



/* ─── Menu items (all pages) ───────────────────────────────────────────── */
const MENU_ITEMS = [
  { label: "Home",        href: "/main"        },
  { label: "About Us",   href: "/about-us"    },
  { label: "Board",      href: "/leads"       },
  { label: "Gallery",    href: "/gallery"     },
  { label: "Events",     href: "/events"      },
  { label: "Projects",   href: "/projects"    },
  { label: "Leaderboard",href: "/leaderboard" },
];

const VISIBLE = 5; // how many items to show at once

/* ─── Retro selector arrow — blinks only on the active item ───────────── */
const RetroArrow = ({ active }: { active: boolean }) => (
  <motion.span
    aria-hidden
    animate={active ? { opacity: [1, 0.05, 1, 0.05, 1] } : { opacity: 0 }}
    transition={
      active
        ? { opacity: { duration: 0.7, repeat: Infinity, repeatDelay: 0.3 } }
        : { duration: 0 }
    }
    style={{
      display: "inline-block",
      width: "1.2em",
      flexShrink: 0,
      color: "#0000ff",
      textShadow: "1px 1px 0 #886600",
    }}
  >▶</motion.span>
);

/* ─── Page ─────────────────────────────────────────────────────────────── */
const LandingPage = () => {
  const router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const enableHoverTemporarily = useCallback(() => {
    setIsHoverEnabled(false);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHoverEnabled(true);
    }, 200);
  }, []);

  // Measure a single item's rendered height so the scroll animation is pixel-perfect
  const firstItemRef = useRef<HTMLDivElement>(null);
  const [itemH, setItemH] = useState(36); // fallback px

  useEffect(() => {
    const measure = () => {
      if (firstItemRef.current) {
        setItemH(firstItemRef.current.getBoundingClientRect().height);
      }
    };
    // Small delay to let layout settle after fonts load
    const id = setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Slide the window whenever selectedIdx goes out of the visible range
  useEffect(() => {
    setWindowStart(prev => {
      if (selectedIdx >= prev + VISIBLE) return selectedIdx - VISIBLE + 1;
      if (selectedIdx < prev)            return selectedIdx;
      return prev;
    });
  }, [selectedIdx]);

  /* ── Keyboard navigation ─────────────────────────────────────────────── */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      enableHoverTemporarily();
      setSelectedIdx(i => (i + 1) % MENU_ITEMS.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      enableHoverTemporarily();
      setSelectedIdx(i => (i - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(MENU_ITEMS[selectedIdx].href);
    }
  }, [selectedIdx, router, enableHoverTemporarily]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* ── Scroll and Swipe navigation ───────────────────────────────────────── */
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (MENU_ITEMS.length <= VISIBLE) return;
    enableHoverTemporarily();
    if (e.deltaY > 0) {
      setSelectedIdx(i => Math.min(i + 1, MENU_ITEMS.length - 1));
    } else if (e.deltaY < 0) {
      setSelectedIdx(i => Math.max(i - 1, 0));
    }
  }, [enableHoverTemporarily]);

  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = touchStartY.current - currentY;

    if (Math.abs(diff) > 30) {
      enableHoverTemporarily();
      if (diff > 0) {
        setSelectedIdx(i => Math.min(i + 1, MENU_ITEMS.length - 1));
      } else {
        setSelectedIdx(i => Math.max(i - 1, 0));
      }
      touchStartY.current = currentY;
    }
  }, [enableHoverTemporarily]);

  const handleTouchEnd = useCallback(() => {
    touchStartY.current = null;
  }, []);

  const canScrollUp   = windowStart > 0;
  const canScrollDown = windowStart + VISIBLE < MENU_ITEMS.length;

  return (
    <div
      className="w-full h-screen relative overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg,#1188EE 0%,#0E8AEA 24.52%,#1093EB 35.07%,#1197EC 45.67%,#16B6F4 52.35%,#10CBF1 56.04%,#0FC6F1 59.73%,#15DEF0 64.76%,#15DEF0 81.25%)",
      }}
    >

      {/* Social icons */}
      <div className="absolute top-4 right-5 z-50 flex items-center gap-3">
        {[
          { href: "https://www.instagram.com/microsoft.innovations.vitc/",            src: "/insta_pixel.svg",    alt: "Instagram" },
          { href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/", src: "/linkedin_pixel.svg", alt: "LinkedIn"  },
          { href: "mailto:mic.vit.chennai@gmail.com",                                  src: "/mail_pixel.svg",    alt: "Email"     },
        ].map(({ href, src, alt }) => (
          <a
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={alt}
            className="group relative flex items-center justify-center cursor-pointer select-none"
            style={{ width: "clamp(38px, 4.4vw, 48px)", height: "clamp(38px, 4.4vw, 48px)" }}
          >
            {/* Base back black square */}
            <div
              className="absolute bottom-0 right-0 bg-[#000809] border-[3px] border-black rounded-[2px]"
              style={{ width: "calc(100% - 6px)", height: "calc(100% - 6px)" }}
            />

            {/* Front colored icon box: sits top-left, translates down-right on hover directly over black square */}
            <div
              className="absolute top-0 left-0 transition-transform duration-200 ease-out group-hover:translate-x-[6px] group-hover:translate-y-[6px]"
              style={{ width: "calc(100% - 6px)", height: "calc(100% - 6px)" }}
            >
              <Image
                src={src}
                alt={`${alt} Logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>
        ))}
      </div>

      {/* Pixel clouds positioned to fill gap — floating together in sync */}
      {/* 1. Left Cloud */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ left: "0%", top: "12%", width: "clamp(450px, 22.5vw, 360px)", zIndex: 6 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      >
        <Image src="/cloud_pixel.svg" alt="Cloud Left" width={346} height={224} className="w-full h-auto object-contain" priority style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* 2. Top-Right Cloud (below social icons) */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ right: "-4%", top: "4%", width: "clamp(450px, 22.5vw, 360px)", zIndex: 6 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      >
        <Image src="/cloud_pixel.svg" alt="Cloud Top Right" width={346} height={224} className="w-full h-auto object-contain" priority style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* 3. Middle-Right Cloud (below flappy bird) */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ right: "4%", top: "34%", width: "clamp(450px, 22.5vw, 360px)", zIndex: 6 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      >
        <Image src="/cloud_pixel.svg" alt="Cloud Middle Right" width={346} height={224} className="w-full h-auto object-contain" priority style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* Big cloud backdrop */}
      <div className="absolute left-0 right-0 pointer-events-none select-none"
        style={{ bottom: "72px", height: "40vh", backgroundImage: "url('/big_cloud.svg')", backgroundRepeat: "repeat-x", backgroundPosition: "bottom", backgroundSize: "auto 100%", zIndex: 2 }} />

      {/* Cityscape (Left & Right edges) */}
      <div className="absolute left-0 pointer-events-none select-none"
        style={{ bottom: "72px", height: "28vh", width: "50vw", backgroundImage: "url('/cityscape.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "bottom left", backgroundSize: "auto 100%", zIndex: 3 }} />
      <div className="absolute right-0 pointer-events-none select-none"
        style={{ bottom: "72px", height: "28vh", width: "50vw", backgroundImage: "url('/cityscape.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "bottom right", backgroundSize: "auto 100%", zIndex: 3 }} />

      {/* Bushes */}
      <div className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "62px",           
          height: "16vh",
          backgroundImage: "url('/pixel_bushes.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 4,
        }} />

      {/* Bobbing bird */}
      <motion.div className="absolute pointer-events-none select-none"
        style={{ right: "12%", top: "20%", width: 56, height: 45, zIndex: 8 }}
        animate={{ y: [0, -14, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/pixel_bird.svg" alt="Pixel Bird" fill className="object-contain" style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* ── CENTRAL COLUMN: ropes → signboard → scrolling nav ─────────── */}
      <div
        className="central-column absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none"
        style={{ top: 0, width: "clamp(320px, 54vw, 700px)", zIndex: 29 }}
      >
        {/* Ropes */}
        <div className="rope-container relative w-full flex justify-between px-[8%]" style={{ height: "clamp(80px, 11vh, 130px)" }}>
          <div className="relative" style={{ width: 14, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Left rope" fill className="object-top object-contain" />
          </div>
          <div className="relative" style={{ width: 14, height: "100%" }}>
            <Image src="/hanging_ropes.svg" alt="Right rope" fill className="object-top object-contain" />
          </div>
        </div>

        {/* Signboard */}
        <div className="relative w-full pointer-events-auto" style={{ aspectRatio: "895 / 455" }}>
          <Image src="/signboard.svg" alt="Signboard" fill className="object-contain" priority />
          <div className="absolute inset-0 flex flex-col items-start justify-center text-left pl-[9.5%] pr-[4%] pointer-events-none">
            <h1
              className="text-[#F8A899] uppercase font-super-mario"
              style={{
                fontFamily: "'SuperMario85', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.4rem, 6.7vw, 92px)",
                lineHeight: "100%",
                letterSpacing: "0%",
                textShadow: "0.06em 0.06em 0 #000000, 0 0.06em 0 #000000, 0.06em 0 0 #000000",
              }}
            >
              M!CROSOFT<br />!NNOVAT!ONS<br />CLUB.
            </h1>
          </div>
        </div>

        {/* ── Scrolling navigation window ────────────────────────────────
            Shows VISIBLE=5 items. Slides when cursor moves beyond range.
        ─────────────────────────────────────────────────────────────── */}
        <nav
          aria-label="Main navigation"
          className="font-press-start pointer-events-auto w-full flex flex-col items-center select-none"
          style={{ marginTop: "clamp(6px, 1vh, 16px)", touchAction: "none" }}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Up scroll indicator — only shown when items above are hidden 
          <motion.div
            animate={{ opacity: canScrollUp ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="font-press-start text-center"
            style={{
              fontSize: "clamp(8px, 1vw, 12px)",
              color: "#fff",
              textShadow: "1px 1px 0 #003399",
              marginBottom: "2px",
              userSelect: "none",
              pointerEvents: "none",
              height: "1.2em",
              lineHeight: 1,
            }}
          >▲ more</motion.div>*/}

          {/* Clipping window — exactly VISIBLE items tall */}
          <div
            style={{
              height: itemH * VISIBLE,
              overflow: "hidden",
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            {/* Sliding inner list — animates translateY to reveal correct slice */}
            <motion.div
              animate={{ y: -windowStart * itemH }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
            >
              {MENU_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  ref={idx === 0 ? firstItemRef : undefined}
                  style={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    paddingTop: "clamp(3px, 0.5vh, 6px)",
                    paddingBottom: "clamp(3px, 0.5vh, 6px)",
                  }}
                >
                  <motion.div
                    animate={selectedIdx === idx ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, repeat: selectedIdx === idx ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <Link
                      href={item.href}
                      onMouseEnter={() => {
                        if (isHoverEnabled) setSelectedIdx(idx);
                      }}
                      className="nav-item-link flex items-center gap-1"
                      style={{
                        fontSize: "clamp(11px, 1.5vw, 19px)",
                        color: selectedIdx === idx ? "#fff" : "#1a5ce0",
                        textShadow: selectedIdx === idx
                          ? "1px 1px 0 #003399,-1px -1px 0 #003399,0 0 8px rgba(255,255,100,0.4)"
                          : "1px 1px 0 rgba(255,255,255,0.8),-1px -1px 0 rgba(255,255,255,0.5)",
                        fontWeight: 700,
                        transition: "color 0.15s, text-shadow 0.15s",
                      }}
                    >
                      <RetroArrow active={selectedIdx === idx} />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Down scroll indicator — only shown when items below are hidden 
          <motion.div
            animate={{ opacity: canScrollDown ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            className="font-press-start text-center"
            style={{
              fontSize: "clamp(8px, 1vw, 12px)",
              color: "#fff",
              textShadow: "1px 1px 0 #003399",
              marginTop: "2px",
              userSelect: "none",
              pointerEvents: "none",
              height: "1.2em",
              lineHeight: 1,
            }}
          >▼ more</motion.div>*/}
        </nav>
      </div>

      {/* Ground ticker */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
        style={{ height: "72px", background: "#CC9339", borderTop: "8px solid #589B00", zIndex: 40 }}
      >
        <div className="relative flex overflow-x-hidden w-full pointer-events-none">
          <div className="animate-marquee whitespace-nowrap flex uppercase font-press-start"
            style={{
              color: "#CC7700",
              fontFamily: '"Press Start 2P", cursive, sans-serif',
              fontWeight: 400,
              fontSize: "clamp(4px, 1.2vw, 16px)",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
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
