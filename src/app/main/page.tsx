"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Floating cloud hook ──────────────────────────────────────────────── */
interface CloudFloatOptions {
  baseTopVh: number;   // % of viewport height
  baseLeftVw: number;  // % of viewport width
  amplitude?: number;  // px oscillation
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
      const t = frameRef.current / 60;
      setOffset(Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => { running = false; };
  }, [amplitude, speed, phase]);

  // Convert vh / vw to inline styles at render time (window is fine in "use client")
  return {
    top: `calc(${baseTopVh}vh + ${offset}px)`,
    left: `${baseLeftVw}vw`,
  };
}

/* ─── Small cloud images ───────────────────────────────────────────────── */
// cloud1 ~355×228, cloud2 ~367×219, cloud3 ~204×125
const CLOUD_CONFIGS: {
  src: string;
  w: number;
  h: number;
  floatOpts: CloudFloatOptions;
}[] = [
  { src: "/images/cloud1.png", w: 200, h: 128, floatOpts: { baseTopVh: 8,  baseLeftVw: 2,  amplitude: 10, speed: 0.4, phase: 0   } },
  { src: "/images/cloud2.png", w: 240, h: 143, floatOpts: { baseTopVh: 22, baseLeftVw: 6,  amplitude: 14, speed: 0.5, phase: 1.5 } },
  { src: "/images/cloud1.png", w: 180, h: 115, floatOpts: { baseTopVh: 7,  baseLeftVw: 70, amplitude: 10, speed: 0.35, phase: 3  } },
  { src: "/images/cloud2.png", w: 220, h: 131, floatOpts: { baseTopVh: 24, baseLeftVw: 78, amplitude: 12, speed: 0.45, phase: 4.5} },
];

function FloatingCloud({ src, w, h, floatOpts }: (typeof CLOUD_CONFIGS)[0]) {
  const pos = useCloudFloat(floatOpts);
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ top: pos.top, left: pos.left, zIndex: 6 }}
    >
      <Image src={src} alt="Cloud" width={w} height={h} priority />
    </div>
  );
}

/* ─── Main page ────────────────────────────────────────────────────────── */
const LandingPage = () => {
  const [showLeaderboardWidget, setShowLeaderboardWidget] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const MENU_ITEMS = [
    { label: "Events",       href: "/events"   },
    { label: "Gallery",      href: "/gallery"  },
    { label: "Project Hall", href: "/projects" },
    { label: "Credits",      href: "/about-us" },
  ];

  /* leaderboard sequence */
  useEffect(() => {
    if (!showLeaderboardWidget) { setAnimationStep(0); return; }
    const t1 = setTimeout(() => setAnimationStep(1), 0);
    const t2 = setTimeout(() => setAnimationStep(2), 1000);
    const t3 = setTimeout(() => setAnimationStep(3), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [showLeaderboardWidget]);

  const leaderboardSrc =
    animationStep >= 3 ? "/3RD.png" :
    animationStep >= 2 ? "/2ND.png" :
    animationStep >= 1 ? "/1ST.png" : null;

  return (
    <div
      className="w-full h-screen flex flex-col relative overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(180deg,#1188EE 0%,#0E8AEA 24.52%,#1093EB 35.07%,#1197EC 45.67%,#16B6F4 52.35%,#10CBF1 56.04%,#0FC6F1 59.73%,#15DEF0 64.76%,#15DEF0 81.25%)",
      }}
    >
      {/* ── Grid overlay ─────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right,rgba(255,255,255,.4) 1px,transparent 1px),
            linear-gradient(to bottom,rgba(255,255,255,.4) 1px,transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Social icons (top-right) ──────────────────────────────────────── */}
      <div className="absolute top-4 right-5 z-50 flex items-center gap-2">
        {[
          { href: "https://www.instagram.com/microsoft.innovations.vitc/", src: "/insta_pixel.svg",    alt: "Instagram" },
          { href: "https://www.linkedin.com/company/microsoft-innovations-club-vitc/", src: "/linkedin_pixel.svg", alt: "LinkedIn"  },
          { href: "mailto:mic.vit.chennai@gmail.com", src: "/mail_pixel.svg",    alt: "Email"     },
        ].map(({ href, src, alt }) => (
          <a key={alt} href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
            <Image
              className="Animated-Logo"
              src={src} alt={`${alt} Logo`}
              width={48} height={48}
              style={{ width: "clamp(34px,4.5vw,48px)", height: "auto", display: "block" }}
              priority
            />
          </a>
        ))}
      </div>

      {/* ── Trophy / leaderboard ─────────────────────────────────────────── */}
      {!showLeaderboardWidget && (
        <button
          id="trophy-icon"
          type="button"
          aria-label="Show leaderboard"
          className="fixed z-50 hover:scale-110 transition-transform duration-200"
          style={{ bottom: 90, left: 24 }}
          onClick={() => setShowLeaderboardWidget(true)}
        >
          <Image src="/cup_home.svg" alt="Leaderboard" width={44} height={48} style={{ display: "block" }} priority />
        </button>
      )}

      <AnimatePresence>
        {showLeaderboardWidget && leaderboardSrc && (
          <motion.div
            className="fixed z-50"
            style={{ left: 24, bottom: 95, cursor: "pointer" }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => { setShowLeaderboardWidget(false); setAnimationStep(0); }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={leaderboardSrc}
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image src={leaderboardSrc} alt="Leaderboard" width={200} height={280}
                  style={{ imageRendering: "pixelated", display: "block" }} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 4 floating small clouds ──────────────────────────────────────── */}
      {CLOUD_CONFIGS.map((cfg, i) => (
        <FloatingCloud key={i} {...cfg} />
      ))}

      {/* ── Big cloud backdrop (white fluffy layer behind buildings) ─────── */}
      {/*    Must sit above the gradient (z-2) but below cityscape/bushes    */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "75px",          /* sit just above ground ticker */
          height: "42vh",          /* fills lower ~40% of sky      */
          backgroundImage: "url('/big_cloud.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 2,
        }}
      />

      {/* ── Cityscape layer ──────────────────────────────────────────────── */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "75px",
          height: "26vh",
          backgroundImage: "url('/cityscape.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 3,
          opacity: 1,
        }}
      />

      {/* ── Green bushes layer ───────────────────────────────────────────── */}
      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "75px",
          height: "18vh",
          backgroundImage: "url('/pixel_bushes.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 4,
        }}
      />

      {/* ── Bobbing bird ─────────────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{ right: "12%", top: "22%", width: 60, height: 48, zIndex: 8 }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/pixel_bird.svg" alt="Pixel Bird" fill
          className="object-contain" style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* ── Ropes (behind board, anchored to very top) ───────────────────── */}
      {/* Left rope */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: 0, left: "calc(50% - 19vw)", width: 14, height: "17vh", zIndex: 28 }}
      >
        <Image src="/hanging_ropes.svg" alt="Left rope" fill className="object-top object-contain" />
      </div>
      {/* Right rope */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: 0, right: "calc(50% - 19vw)", width: 14, height: "17vh", zIndex: 28 }}
      >
        <Image src="/hanging_ropes.svg" alt="Right rope" fill className="object-top object-contain" />
      </div>

      {/* ── Signboard (centred, SMALLER than before) ─────────────────────── */}
      {/*    Aspect ratio ~895:455 ≈ 1.966. Keep width ≤ 46vw so it's compact */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: "13vh",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(280px, 44vw, 600px)",
          aspectRatio: "895 / 455",
          zIndex: 29,
        }}
      >
        <Image src="/signboard.svg" alt="Signboard" fill className="object-contain" priority />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-none px-4">
          <h1
            className="text-[#FCD7CE] font-bold uppercase leading-snug font-press-start"
            style={{
              fontSize: "clamp(0.75rem, 2.8vw, 2.2rem)",
              textShadow: "3px 3px 0 #4d2304,-2px -2px 0 #4d2304,2px -2px 0 #4d2304,-2px 2px 0 #4d2304,2px 2px 0 #4d2304",
            }}
          >
            M!CROSOFT<br />
            !NNOVAT!ONS<br />
            CLUB.
          </h1>
        </div>
      </div>

      {/* ── Navigation menu (absolutely placed in sky gap, below signboard) ─ */}
      {/*    Sits in the open blue-sky band above the big cloud / buildings   */}
      <div
        className="absolute font-press-start pointer-events-auto select-none"
        style={{
          /* Start just below the signboard bottom (13vh top + ~23vh board height = ~36vh) */
          top: "clamp(300px, 38vh, 460px)",
          left: "50%",
          transform: "translateX(-40%)",
          zIndex: 30,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(6px, 1.2vh, 14px)",
          color: "#1188EE",
          fontSize: "clamp(12px, 1.6vw, 20px)",
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

      {/* ── Ground ticker ────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
        style={{
          height: "75px",
          background: "#CC9339",
          borderTop: "8px solid #589B00",
          zIndex: 40,
        }}
      >
        <div className="relative flex overflow-x-hidden w-full pointer-events-none">
          <div
            className="animate-marquee whitespace-nowrap flex uppercase tracking-widest font-press-start"
            style={{ color: "#5E3A00", fontSize: "clamp(10px, 1.3vw, 14px)" }}
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