"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const [left, setLeft] = useState(baseLeft);

  const frame = useRef(0);

  useEffect(() => {
    let running = true;

    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(baseTop + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      const vw = window.innerWidth;
      const scale = vw / 1920;
      setLeft(baseLeft * scale);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      running = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [baseTop, baseLeft, amplitude, speed, phase]);

  return { top, left };
}

const Clouds = ({ clouds }: { clouds: { top: number; left: number }[] }) => (
  <>
    {clouds.map((cloud, idx) => (
      <Image
        key={idx}
        src={`/images/cloud${(idx % 3) + 1}.png`}
        alt={`Cloud ${idx + 1}`}
        width={idx % 3 === 2 ? 204 : idx % 3 === 1 ? 367 : 355}
        height={idx % 3 === 2 ? 125 : idx % 3 === 1 ? 219 : 228}
        style={{
          position: 'absolute',
          top: `${cloud.top}px`,
          left: `${cloud.left}px`,
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.85
        }}
        priority
      />
    ))}
  </>
);

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLeaderboardWidget, setShowLeaderboardWidget] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  const cloudPositions = [
    { baseTop: 180, baseLeft: 60, amplitude: 15, speed: 0.5, phase: 0 },
    { baseTop: 380, baseLeft: 120, amplitude: 20, speed: 0.6, phase: 1.5 },
    { baseTop: 100, baseLeft: 1120, amplitude: 15, speed: 0.4, phase: 3 },
    { baseTop: 360, baseLeft: 1200, amplitude: 20, speed: 0.5, phase: 4.5 },
  ].map(useCloudFloat);

  const MENU_ITEMS = [
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Project Hall", href: "/projects" },
    { label: "Credits", href: "/about-us" },
  ];

  // Manage animation sequence steps for leaderboard podium
  useEffect(() => {
    if (showLeaderboardWidget) {
      const timer1 = setTimeout(() => setAnimationStep(1), 0);
      const timer2 = setTimeout(() => setAnimationStep(2), 1000);
      const timer3 = setTimeout(() => setAnimationStep(3), 2000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setAnimationStep(0);
    }
  }, [showLeaderboardWidget]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getLeaderboardImage = () => {
    if (animationStep >= 3) return "/3RD.png";
    if (animationStep >= 2) return "/2ND.png";
    if (animationStep >= 1) return "/1ST.png";
    return null;
  };

  return (
    <div 
      className="w-full min-h-screen flex flex-col relative overflow-hidden select-none"
      style={{
        background: "linear-gradient(180deg, #1188EE 0%, #0E8AEA 24.52%, #1093EB 35.07%, #1197EC 45.67%, #16B6F4 52.35%, #10CBF1 56.04%, #0FC6F1 59.73%, #15DEF0 64.76%, #15DEF0 81.25%)",
      }}
    >
      {/* Background Grid Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Top Left Logo is rendered globally by ConditionalNavbar */}

      {/* Top Right Socials */}
      <div className="absolute top-4 right-6 z-50 flex items-center gap-2">
        <a href="https://www.instagram.com/microsoft.innovations.vitc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Image className="Animated-Logo" src="/insta_pixel.svg" alt="Instagram Logo" width={64} height={64}
            style={{ width: "clamp(36px, 5vw, 48px)", height: "auto", display: "block" }} priority />
        </a>
        <a href="https://www.linkedin.com/company/microsoft-innovations-club-vitc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Image className="Animated-Logo" src="/linkedin_pixel.svg" alt="LinkedIn Logo" width={64} height={64}
            style={{ width: "clamp(36px, 5vw, 48px)", height: "auto", display: "block" }} priority />
        </a>
        <a href="mailto:mic.vit.chennai@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
          <Image className="Animated-Logo" src="/mail_pixel.svg" alt="Mail Logo" width={64} height={64}
            style={{ width: "clamp(36px, 5vw, 48px)", height: "auto", display: "block" }} priority />
        </a>
      </div>

      {/* Trophy Icon - Static bottom-left position (above bushes/ground) */}
      {!showLeaderboardWidget && (
        <button
          id="trophy-icon"
          type="button"
          aria-label="Show leaderboard preview"
          className="fixed z-50 hover:scale-110 transition-transform duration-200"
          style={{ bottom: 95, left: 30 }}
          onClick={() => {
            setShowLeaderboardWidget(true);
          }}
        >
          <Image
            src="/cup_home.svg"
            alt="Leaderboard Logo"
            width={48}
            height={52}
            style={{ display: "block" }}
            priority
          />
        </button>
      )}

      {/* Leaderboard Podium Animation */}
      <AnimatePresence>
        {showLeaderboardWidget && (
          <motion.div
            className="fixed z-50"
            style={{
              left: 30,
              bottom: 105,
              cursor: "pointer",
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => {
              setShowLeaderboardWidget(false);
              setAnimationStep(0);
            }}
          >
            {animationStep >= 1 && (
              <motion.div
                style={{ position: "relative" }}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={getLeaderboardImage()}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Image
                      src={getLeaderboardImage()!}
                      alt="Leaderboard"
                      width={200}
                      height={280}
                      style={{ imageRendering: "pixelated", display: "block" }}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clouds */}
      <Clouds clouds={cloudPositions} />

      {/* Big Cloud Layer (White rolling background clouds) */}
      <div 
        className="absolute bottom-[80px] left-0 right-0 h-[465px] pointer-events-none select-none z-0"
        style={{
          backgroundImage: `url('/big_cloud.svg')`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '1440px 465px',
          imageRendering: 'pixelated',
          opacity: 1
        }}
      />

      {/* Cityscape Skyline Layer */}
      <div 
        className="absolute bottom-[80px] left-0 right-0 h-[249px] pointer-events-none select-none z-1"
        style={{
          backgroundImage: `url('/cityscape.svg')`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '316px 249px',
          imageRendering: 'pixelated',
          opacity: 0.6
        }}
      />

      {/* Bushes Layer */}
      <div 
        className="absolute bottom-[75px] left-0 right-0 h-[200px] pointer-events-none select-none z-10"
        style={{
          backgroundImage: `url('/pixel_bushes.svg')`,
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: '1440px 200px',
          imageRendering: 'pixelated',
        }}
      />

      {/* Flying Bobbing Bird */}
      <motion.div 
        className="absolute right-[8%] sm:right-[15%] top-[24%] sm:top-[28%] z-20 pointer-events-none select-none w-[64px] h-[52px]"
        animate={{
          y: [0, -18, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image src="/pixel_bird.svg" alt="Pixel Bird" fill className="object-contain" style={{ imageRendering: "pixelated" }} />
      </motion.div>

      {/* Hanging Signboard & Navigation Menu (Centered) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center select-none pointer-events-none w-[90vw] max-w-[895px] h-[780px]">
        {/* Ropes (Hanging behind the board relative to screen top) */}
        <div className="absolute top-0 left-[8.9%] w-[17px] h-[180px]">
          <Image src="/hanging_ropes.svg" alt="Left Rope" fill className="object-top object-contain" />
        </div>
        <div className="absolute top-0 right-[12.8%] w-[17px] h-[180px]">
          <Image src="/hanging_ropes.svg" alt="Right Rope" fill className="object-top object-contain" />
        </div>

        {/* Signboard with dynamic font resizing */}
        <div className="relative mt-[110px] w-full aspect-[895/455] pointer-events-auto">
          <Image src="/signboard.svg" alt="Signboard" fill className="object-contain" priority />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 py-8 z-40 select-none pointer-events-none">
            <h1 
              className="text-[#FCD7CE] text-[clamp(1.1rem,4.2vw,3.8rem)] font-bold tracking-wide uppercase leading-tight font-press-start" 
              style={{ 
                textShadow: "4px 4px 0px #4d2304, -2px -2px 0px #4d2304, 2px -2px 0px #4d2304, -2px 2px 0px #4d2304, 2px 2px 0px #4d2304" 
              }}
            >
              M!CROSOFT<br/>
              !NNOVAT!ONS<br/>
              CLUB.
            </h1>
          </div>
        </div>

        {/* Center Menu Links (Directly under Signboard) */}
        <div className="mt-8 flex flex-col items-start gap-4 font-press-start pointer-events-auto select-none text-[#1188EE] z-40 bg-transparent text-[clamp(14px,2.2vw,22px)] pl-6">
          {MENU_ITEMS.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              className="group flex items-center relative pl-8 hover:translate-x-2 transition-all duration-200"
            >
              <span className="absolute left-0 text-[#1188EE] opacity-0 group-hover:opacity-100 transition-opacity duration-200">▶</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Ground Ticker Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-[#CC9339] border-t-8 border-[#589B00] z-20 flex items-center overflow-hidden">
        <div className="relative flex overflow-x-hidden w-full select-none pointer-events-none">
          <div className="animate-marquee whitespace-nowrap flex text-[#5E3A00] font-press-start text-[clamp(11px,1.4vw,14px)] uppercase tracking-widest">
            <span className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            <span className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            <span className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            <span className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            <span className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            <span className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            <span className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
            <span className="mx-8">MICROSOFT INNOVATIONS CLUB TENURE 2026-2027</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;