'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CARDS = [
  {
    id: 1,
    title: "About MIC",
    desc: "The MIC at VIT Chennai is a student-led tech community under the (MLSA) program. It's a space where students explore and innovate with technologies like AI, Azure, and GitHub. Whether you're a beginner or a builder, we offer an inclusive platform for collaboration, curiosity, and hands-on learning through real-world experiences.",
    bg: "/images/about_us_assets/aboutusaqua.png",
  },
  {
    id: 2,
    title: "What we do!",
    desc: "We host hands-on workshops, speaker sessions, and hackathons focused on Microsoft technologies like Azure, Power Platform, and Copilot. These events help students build skills, explore emerging tech, and grow into confident, well-rounded tech leaders.",
    bg: "/images/about_us_assets/aboutusyellow.png",
  },
  {
    id: 3,
    title: "What you get!",
    desc: "We focus on leadership, teamwork, and communication alongside coding. Our club supports personal and professional growth, helping members build confidence and strong networks. No matter your background, you'll find a welcoming community that learns, creates, and grows together.",
    bg: "/images/about_us_assets/aboutuspink.png",
  },
];

// Fixed card dimensions in 1024-tall canvas units — all cards sit at the SAME top (parallel)
const CARD_W      = 305;
const CARD_H      = 345;
const CARD_GAP    = 82;
const CARD_TOP    = 155;   // same for all three cards — no stagger

function MysteryCard({
  title, desc, bg, left,
}: {
  title: string; desc: string; bg: string; left: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute cursor-pointer"
      style={{ left, top: CARD_TOP, width: CARD_W, height: CARD_H }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Pixel card background */}
      <img
        src={bg} alt=""
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: "pixelated" }}
        draggable={false}
      />

      {/* Cherry decoration (top-left, slightly outside card) */}
      <img
        src="/images/about_us_assets/cherry.svg" alt="Cherry"
        className="absolute pointer-events-none"
        style={{ width: 68, height: 68, top: -28, left: -20, imageRendering: "pixelated" }}
        draggable={false}
      />

      {/* Question mark — shown when NOT hovered */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <span
          className="font-press-start font-extrabold text-white select-none"
          style={{ fontSize: 80, lineHeight: 1, textShadow: "4px 4px 0 rgba(0,0,0,0.25)" }}
        >
          ?
        </span>
      </div>

      {/* Content — revealed on hover */}
      <div
        className="absolute z-10 flex flex-col items-center transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, inset: 0, padding: "22px 18px 16px" }}
      >
        <h2
          className="font-press-start text-black font-extrabold tracking-wide uppercase text-center mb-3"
          style={{ fontSize: 13, lineHeight: 1.4 }}
        >
          {title}
        </h2>
        <div className="flex-grow overflow-y-auto w-full" style={{ scrollbarWidth: "none" }}>
          <p
            className="font-ibm-plex-mono text-black font-semibold text-center"
            style={{ fontSize: 11.5, lineHeight: 1.6 }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

const AboutUsPage: React.FC = () => {
  const [scale, setScale]           = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(1440);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (typeof window === "undefined") return;
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (!mobile) {
        const s = window.innerHeight / 1024;
        setScale(s);
        setCanvasWidth(window.innerWidth / s);
      } else {
        setScale(1);
        setCanvasWidth(window.innerWidth);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ───────── layout geometry (1024px-tall canvas) ───────── */
  const groupW    = 3 * CARD_W + 2 * CARD_GAP;
  const groupLeft = (canvasWidth - groupW) / 2;

  const cardLefts = [
    groupLeft,
    groupLeft + CARD_W + CARD_GAP,
    groupLeft + 2 * (CARD_W + CARD_GAP),
  ];

  // Animation strip between cards bottom and contact banner
  const cardsBottom = CARD_TOP + CARD_H;          // e.g. 500
  const ANIM_Y      = cardsBottom + 45;            // y for running characters ≈ 545

  // Contact banner: smaller, hugging the scrolling ground
  const GROUND_TOP  = 920;
  const bannerW     = Math.min(700, canvasWidth * 0.48);
  const bannerH     = bannerW * (177 / 871);
  const bannerLeft  = (canvasWidth - bannerW) / 2;
  const bannerTop   = GROUND_TOP - bannerH - 20;  // sit just above the ground

  /* ───────── mobile ───────── */
  if (isMobile) {
    return (
      <div
        className="w-full min-h-[100dvh] overflow-x-hidden overflow-y-auto flex flex-col items-center py-8 px-4 gap-6 select-none"
        style={{ background: "linear-gradient(180deg,#1188EE 0%,#0E8AEA 25%,#1093EB 35%,#1197EC 46%,#16B6F4 52%,#10CBF1 56%,#0FC6F1 60%,#15DEF0 65%,#15DEF0 81%)" }}
      >
        <style>{`
          body { background:linear-gradient(180deg,#1188EE 0%,#0E8AEA 25%,#1093EB 35%,#1197EC 46%,#16B6F4 52%,#10CBF1 56%,#0FC6F1 60%,#15DEF0 65%,#15DEF0 81%) !important; overflow-y:auto !important; }
          img[alt="MIC Logo"],img[src*="mic-logo"]{ display:none !important; }
          button[aria-label="Open navigation"],.z-\[60\]{ display:none !important; }
        `}</style>
        <div className="w-full flex justify-between items-center z-40 px-2 shrink-0">
          <Link href="/main"><img src="/mic_logo_pixel.svg" alt="MIC Pixel Logo" className="w-12 h-12" style={{ imageRendering:"pixelated" }} /></Link>
          <Link href="/main"><img src="/close_button.svg" alt="Close" className="w-10 h-10" /></Link>
        </div>
        <h1 className="font-press-start text-2xl text-black tracking-wider text-center drop-shadow-[3px_3px_0px_rgba(255,255,255,0.4)]">About Us</h1>
        {CARDS.map(card => (
          <div key={card.id} className="relative flex flex-col items-center justify-start text-center shrink-0 w-full max-w-[305px]"
            style={{ height:300, backgroundImage:`url(${card.bg})`, backgroundSize:"100% 100%", backgroundRepeat:"no-repeat", imageRendering:"pixelated", padding:"22px 16px 14px" }}
          >
            <img src="/images/about_us_assets/cherry.svg" alt="Cherry" className="absolute" style={{ width:58,height:58,top:-20,left:-14,imageRendering:"pixelated" }} />
            <h2 className="font-press-start text-black font-extrabold uppercase text-center mb-2" style={{ fontSize:12, lineHeight:1.5 }}>{card.title}</h2>
            <div className="flex-grow overflow-y-auto w-full" style={{ scrollbarWidth:"none" }}>
              <p className="font-ibm-plex-mono text-black font-semibold text-center" style={{ fontSize:10.5, lineHeight:1.55 }}>{card.desc}</p>
            </div>
          </div>
        ))}
        <div className="relative w-full max-w-[320px] shrink-0 mb-2">
          <img src="/images/about_us_assets/contact_details.svg" alt="Contact Us" className="w-full h-auto" />
          <div className="absolute flex items-center justify-center gap-5" style={{ top:"54%", left:"50%", transform:"translate(-50%,0)" }}>
            {[
              { href:"https://www.instagram.com/microsoft.innovations.vitc/?hl=en", src:"/images/about_us_assets/Frame 112.svg", alt:"Instagram" },
              { href:"https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in", src:"/images/about_us_assets/Frame 114.svg", alt:"LinkedIn" },
              { href:"mailto:micvitcc@gmail.com", src:"/images/about_us_assets/Frame 116.svg", alt:"Mail" },
            ].map(icon => (
              <a key={icon.alt} href={icon.href} target={icon.href.startsWith("http")?"_blank":undefined} rel={icon.href.startsWith("http")?"noopener noreferrer":undefined}
                className="w-11 h-11 hover:scale-110 transition-transform">
                <img src={icon.src} alt={icon.alt} className="w-full h-full object-contain" style={{ imageRendering:"pixelated" }} />
              </a>
            ))}
          </div>
        </div>
        <div className="w-full h-14 border-t-4 border-black bg-[#DD9955] overflow-hidden flex items-center shrink-0">
          <div className="flex whitespace-nowrap animate-marquee">
            {[0,1].map(r => (
              <span key={r} className="inline-flex items-center shrink-0 text-[11px] text-[#CC7700] uppercase font-bold font-press-start">
                {Array(4).fill("MICROSOFT INNOVATIONS CLUB TENURE 2026-2027").map((t,i) => (
                  <React.Fragment key={i}><span>{t}</span><img src="/images/about_us_assets/cherry.svg" alt="" className="w-3.5 h-3.5 mx-3" style={{ imageRendering:"pixelated" }} /></React.Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ───────── DESKTOP ───────── */
  return (
    <div
      className="h-[100dvh] w-full relative overflow-hidden select-none"
      style={{ background: "linear-gradient(180deg,#1188EE 0%,#0E8AEA 25%,#1093EB 35%,#1197EC 46%,#16B6F4 52%,#10CBF1 56%,#0FC6F1 60%,#15DEF0 65%,#15DEF0 81%)" }}
    >
      <style>{`
        body { background:linear-gradient(180deg,#1188EE 0%,#0E8AEA 25%,#1093EB 35%,#1197EC 46%,#16B6F4 52%,#10CBF1 56%,#0FC6F1 60%,#15DEF0 65%,#15DEF0 81%) !important; overflow:hidden !important; }
        img[alt="MIC Logo"],img[src*="mic-logo"]{ display:none !important; }
        button[aria-label="Open navigation"],.z-\[60\]{ display:none !important; }
      `}</style>

      {/* Canvas scaled to fill viewport */}
      <div
        className="absolute top-0 left-0"
        style={{ width: canvasWidth, height: 1024, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {/* Clouds */}
        {[
          { pct:0.03, top:55, w:170, delay:"0s" },
          { pct:0.79, top:48, w:185, delay:"0.8s" },
          { pct:0.56, top:530, w:155, delay:"1.5s" },
          { pct:0.88, top:630, w:165, delay:"0.3s" },
          { pct:0.06, top:710, w:140, delay:"2s" },
        ].map((c,i) => (
          <img key={i} src="/cloud_pixel.svg" alt="" draggable={false}
            className="absolute pointer-events-none z-0 opacity-70 animate-retro-float"
            style={{ left:canvasWidth*c.pct, top:c.top, width:c.w, imageRendering:"pixelated", animationDelay:c.delay }}
          />
        ))}

        {/* Nav */}
        <Link href="/main" className="absolute top-8 left-8 z-40 hover:scale-105 transition-transform">
          <img src="/mic_logo_pixel.svg" alt="MIC Pixel Logo" className="w-16 h-16" style={{ imageRendering:"pixelated" }} draggable={false} />
        </Link>
        <Link href="/main" className="absolute top-8 right-8 z-40 hover:scale-105 transition-transform">
          <img src="/close_button.svg" alt="Close" className="w-12 h-12" draggable={false} />
        </Link>

        {/* Title */}
        <h1
          className="absolute left-1/2 -translate-x-1/2 font-press-start text-black text-center select-none z-30 whitespace-nowrap"
          style={{ top:40, fontSize:46, textShadow:"3px 3px 0 rgba(255,255,255,0.4)" }}
        >
          About Us
        </h1>

        {/* ── Three parallel Mystery Cards ── */}
        {CARDS.map((card, i) => (
          <MysteryCard
            key={card.id}
            title={card.title}
            desc={card.desc}
            bg={card.bg}
            left={cardLefts[i]}
          />
        ))}

        {/* ── Pac-Man running left → right, looping ── */}
        <motion.img
          src="/images/about_us_assets/pacman.svg"
          alt="Pacman"
          draggable={false}
          className="absolute z-15 pointer-events-none"
          style={{ top: ANIM_Y, width: 72, height: 72, imageRendering: "pixelated" }}
          animate={{ x: [-90, canvasWidth + 90] }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear", repeatDelay: 0 }}
        />

        {/* ── Ghosts chasing Pac-Man with staggered delays ── */}
        {/* Red ghost — closest chaser */}
        <motion.img
          src="/images/about_us_assets/ghostr.svg"
          alt="Blinky"
          draggable={false}
          className="absolute z-14 pointer-events-none"
          style={{ top: ANIM_Y + 1, width: 70, height: 74, imageRendering: "pixelated" }}
          animate={{ x: [-90, canvasWidth + 90] }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear", delay: 1.1, repeatDelay: 0 }}
        />
        {/* Orange ghost */}
        <motion.img
          src="/images/about_us_assets/ghosto.svg"
          alt="Clyde"
          draggable={false}
          className="absolute z-14 pointer-events-none"
          style={{ top: ANIM_Y + 1, width: 70, height: 74, imageRendering: "pixelated" }}
          animate={{ x: [-90, canvasWidth + 90] }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear", delay: 2.1, repeatDelay: 0 }}
        />
        {/* Blue ghost — scattering (moves right→left, opposite direction) */}
        <motion.img
          src="/images/about_us_assets/ghostb.png"
          alt="Inky"
          draggable={false}
          className="absolute z-14 pointer-events-none"
          style={{ top: ANIM_Y - 5, width: 70, height: 74, imageRendering: "pixelated" }}
          animate={{ x: [canvasWidth + 90, -90] }}
          transition={{ repeat: Infinity, duration: 11, ease: "linear", delay: 0.5, repeatDelay: 0 }}
        />
        {/* Pink ghost — slower, also right→left */}
        <motion.img
          src="/images/about_us_assets/ghost.svg"
          alt="Pinky"
          draggable={false}
          className="absolute z-14 pointer-events-none"
          style={{ top: ANIM_Y + 2, width: 70, height: 74, imageRendering: "pixelated" }}
          animate={{ x: [canvasWidth + 90, -90] }}
          transition={{ repeat: Infinity, duration: 13, ease: "linear", delay: 1.8, repeatDelay: 0 }}
        />

        {/* ── Contact Us Banner — small, close to ground ── */}
        <div
          className="absolute z-20"
          style={{ left: bannerLeft, top: bannerTop, width: bannerW, height: bannerH }}
        >
          <img
            src="/images/about_us_assets/contact_details.svg"
            alt="Contact Us"
            className="w-full h-full"
            style={{ objectFit: "fill" }}
            draggable={false}
          />
          {/* Social icons in lower half */}
          <div
            className="absolute flex items-center justify-center gap-6"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, 0)", height: bannerH * 0.5 }}
          >
            {[
              { href:"https://www.instagram.com/microsoft.innovations.vitc/?hl=en", src:"/images/about_us_assets/Frame 112.svg", alt:"Instagram" },
              { href:"https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in", src:"/images/about_us_assets/Frame 114.svg", alt:"LinkedIn" },
              { href:"mailto:micvitcc@gmail.com", src:"/images/about_us_assets/Frame 116.svg", alt:"Mail" },
            ].map(icon => (
              <a key={icon.alt} href={icon.href}
                target={icon.href.startsWith("http")?"_blank":undefined}
                rel={icon.href.startsWith("http")?"noopener noreferrer":undefined}
                className="hover:scale-110 hover:-translate-y-1 transition-all duration-200"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", width:bannerH*0.44, height:bannerH*0.44 }}
              >
                <img src={icon.src} alt={icon.alt} className="w-full h-full object-contain" style={{ imageRendering:"pixelated" }} draggable={false} />
              </a>
            ))}
          </div>
        </div>

        {/* ── Ground + Marquee ── */}
        <div
          className="absolute z-30 pointer-events-none select-none border-t-4 border-black bg-[#DD9955] overflow-hidden flex items-center"
          style={{ top: GROUND_TOP, left: 0, width: canvasWidth, height: 1024 - GROUND_TOP }}
        >
          <div className="flex whitespace-nowrap animate-marquee">
            {[0, 1].map(r => (
              <span key={r} className="inline-flex items-center shrink-0 text-[18px] text-[#CC7700] tracking-wider uppercase font-bold font-press-start">
                {Array(Math.max(5, Math.ceil(canvasWidth / 295))).fill("MICROSOFT INNOVATIONS CLUB TENURE 2026-2027").map((t, i) => (
                  <React.Fragment key={i}>
                    <span>{t}</span>
                    <img src="/images/about_us_assets/cherry.svg" alt="" className="w-6 h-6 mx-8" style={{ imageRendering:"pixelated" }} draggable={false} />
                  </React.Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
