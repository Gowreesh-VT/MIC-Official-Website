"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDarkMode } from "@/hooks/useDarkMode";

// Larger cloud images & new variety
const cloudImages = [
  "/images/cloud1.png",
  "/images/cloud2.png",
  "/images/cloud1.png",
  "/images/cloud3.png",
  "/images/cloud3.png",
  "/images/cloud2.png",
  "/images/cloud1.png",
  "/images/cloud3.png",
  "/images/cloud2.png",
  "/images/cloud1.png",
];

interface CloudFloatOptions {
  baseTop: number;
  baseLeft: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

// Floating cloud animation hook
function useCloudFloat({
  baseTop,
  baseLeft,
  amplitude = 35,
  speed = 1,
  phase = 0,
}: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
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
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);
  return { top, left: baseLeft };
}

function getThemeColors(isDarkMode: boolean) {
  return isDarkMode
    ? {
      background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
      gridOpacity1: "rgba(255,255,255,0.09)",
      gridOpacity2: "rgba(255,255,255,0.07)",
      headingColor: "#fff",
      headingTextShadow: "4px 4px 0 #000, 0 2px 8px #000",
      starOpacity: 0.85,
      cardTextColor: "#444",
    }
    : {
      background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
      gridOpacity1: "rgba(255,255,255,0.3)",
      gridOpacity2: "rgba(255,255,255,0.3)",
      headingColor: "#1e293b",
      headingTextShadow: "2px 2px 0 rgba(255,255,255,0.7), 0 1px 4px rgba(0,0,0,0.15)",
      starOpacity: 0.4,
      cardTextColor: "#333",
    };
}

const AboutSection = () => (
  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10 }}>
    {/* Blue/Cyan Card - bluebox.png image background */}
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 160,
        width: 330,
        height: 330,
        backgroundImage: "url('/images/bluebox.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        zIndex: 10,
      }}
    />
    <Image
      src="/images/cherry.png"
      alt="Cherry"
      width={44}
      height={44}
      style={{
        position: "absolute",
        left: 102,
        top: 155,
        zIndex: 20,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />

    {/* Yellow Card - yellowbox.png image background */}
    <div
      style={{
        position: "absolute",
        left: 640,
        top: 160,
        width: 330,
        height: 330,
        backgroundImage: "url('/images/yellowbox.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        zIndex: 10,
      }}
    />
    <Image
      src="/images/cherry.png"
      alt="Cherry"
      width={44}
      height={44}
      style={{
        position: "absolute",
        left: 622,
        top: 155,
        zIndex: 20,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />

    {/* Pink Card - pinkbox.png image background */}
    <div
      style={{
        position: "absolute",
        left: 1160,
        top: 160,
        width: 330,
        height: 330,
        backgroundImage: "url('/images/pinkbox.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        zIndex: 10,
      }}
    />
    <Image
      src="/images/cherry.png"
      alt="Cherry"
      width={44}
      height={44}
      style={{
        position: "absolute",
        left: 1142,
        top: 155,
        zIndex: 20,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />

    {/* Decorative Sprites - Resized & repositioned outside card boundaries */}
    <Image
      src="/images/ghost-blue.png"
      alt="Blue Ghost"
      width={48}
      height={50}
      style={{ position: "absolute", left: 60, top: 420, width: 56, height: 58, zIndex: 15, pointerEvents: "none" }}
    />
    <Image
      src="/images/ghost-orange.png"
      alt="Orange Ghost"
      width={48}
      height={50}
      style={{ position: "absolute", left: 1000, top: 280, width: 56, height: 58, zIndex: 15, pointerEvents: "none" }}
    />
    <Image
      src="/images/ghost-red.png"
      alt="Red Ghost"
      width={48}
      height={50}
      style={{ position: "absolute", left: 1520, top: 480, width: 56, height: 58, zIndex: 15, pointerEvents: "none" }}
    />
    <Image
      src="/images/ghost-pink.png"
      alt="Pink Ghost"
      width={48}
      height={50}
      style={{ position: "absolute", left: 150, top: 600, width: 56, height: 58, zIndex: 15, pointerEvents: "none" }}
    />
    <Image
      src="/images/pacman.png"
      alt="Pacman"
      width={75}
      height={75}
      style={{ position: "absolute", left: 753, top: 540, width: 75, height: 75, transform: "rotate(-180deg)", zIndex: 15, pointerEvents: "none" }}
    />
    <Image
      src="/images/close-button.png"
      alt="Close Button"
      width={74}
      height={78}
      style={{ position: "absolute", right: 40, top: 36, width: 74, height: 78, zIndex: 15, pointerEvents: "none" }}
    />

    {/* Contact Us Bar - contact_details.png image background (h2 removed — text is baked into image) */}
    <div
      style={{
        position: "absolute",
        left: 276,
        top: 650,
        width: 1028,
        height: 140,
        backgroundImage: "url('/images/contact_details.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <div style={{ display: "flex", gap: "180px", alignItems: "center", justifyContent: "center", marginTop: "30px" }}>
        {/* Instagram button */}
        <a
          href="https://www.instagram.com/microsoft.innovations.vitc/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 54,
            height: 54,
            background: "#A8F4F9",
            border: "5px solid #000000",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <Image src="/images/instagram.png" alt="Instagram" width={32} height={32} style={{ pointerEvents: "none" }} />
        </a>

        {/* LinkedIn button */}
        <a
          href="https://www.linkedin.com/company/microsoft-innovations-club-vitc/?originalSubdomain=in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 54,
            height: 54,
            background: "#FBC0D0",
            border: "5px solid #000000",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <Image src="/images/linkedin.png" alt="LinkedIn" width={32} height={32} style={{ pointerEvents: "none" }} />
        </a>

        {/* Medium/M button */}
        <a
          href="mailto:micvitcc@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 54,
            height: 54,
            background: "#E6C4F4",
            border: "5px solid #000000",
            boxShadow: "5px 5px 0px #000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: "24px",
              color: "#000000",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            M
          </span>
        </a>
      </div>
    </div>

    {/* Footer - Solid light orange banner with scrolling tenure text (right-to-left) */}
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: 70,
        background: "#e0a458",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          fontFamily: '"Press Start 2P", monospace',
          fontSize: "13px",
          color: "#8a5a2b",
          fontWeight: "bold",
          letterSpacing: "2px",
          whiteSpace: "nowrap",
          animation: "scrollTicker 28s linear infinite",
          willChange: "transform",
        }}
      >
        MICROSOFT INNOVATIONS CLUB TENURE 2026-2027 &nbsp;&bull;&nbsp; MICROSOFT INNOVATIONS CLUB TENURE 2026-2027 &nbsp;&bull;&nbsp; MICROSOFT INNOVATIONS CLUB TENURE 2026-2027 &nbsp;&bull;&nbsp; MICROSOFT INNOVATIONS CLUB TENURE 2026-2027 &nbsp;&bull;&nbsp; MICROSOFT INNOVATIONS CLUB TENURE 2026-2027 &nbsp;&bull;&nbsp; MICROSOFT INNOVATIONS CLUB TENURE 2026-2027 &nbsp;&bull;&nbsp;
      </div>
    </div>
  </div>
);

// Star positions - scattered across the background
const STAR_COUNT = 7;
const STAR_POSITIONS = [
  { top: 12, left: 8 },
  { top: 10, left: 25 },
  { top: 18, left: 42 },
  { top: 14, left: 58 },
  { top: 20, left: 72 },
  { top: 8, left: 85 },
  { top: 16, left: 95 },
].map((pos) => ({ ...pos, size: Math.random() * 2 + 3 }));

const AboutUsPage: React.FC = () => {
  const isDarkMode = useDarkMode();
  const cloudPositions = [
    useCloudFloat({ baseTop: 130, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 440, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 655, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 730, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 100, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: -10, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 100, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: 560, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 }),
  ];

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
    document.documentElement.style.minHeight = "100vh";
  }, []);

  const lift = 80;
  const themeColors = getThemeColors(isDarkMode);

  return (
    <>
      <div
        className="page-container"
        style={{
          background: "linear-gradient(to bottom, #1a7fd4 0%, #1ec8e8 100%)",
          userSelect: "none",
          touchAction: "none",
          overflowX: "hidden",
          overflowY: "hidden",
          height: "100vh",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* No stars or grid on light blue sky */}

        {/* Animated Clouds - Made ~15-20% larger (280x182) */}
        {cloudPositions.map((pos, i) => (
          <Image
            key={i}
            src={cloudImages[i % cloudImages.length]}
            alt={`Cloud ${i + 1}`}
            width={280}
            height={182}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              zIndex: 2,
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.9,
              transition: "top 0.18s linear",
            }}
            priority
          />
        ))}

        <div className="about-heading">
          <h1
            style={{
              color: "#000000",
              textShadow: "3px 3px 0px rgba(255,255,255,0.6)",
            }}
          >
            About us
          </h1>
        </div>

        {/* Static Pixel-Perfect Recreation of About Us layout matching Retro Arcade theme */}
        <AboutSection />
      </div>

      <style jsx>{`
        .page-container {
          position: relative;
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
          overflow-y: auto;
          min-height: 100vh;
        }
        .about-heading {
          position: relative;
          width: 90%;
          max-width: 650px;
          margin: 50px auto 36px auto;
          text-align: center;
          user-select: none;
          pointer-events: none;
        }
        .about-heading h1 {
          font-family: "Press Start 2P", monospace;
          font-size: clamp(2.1rem, 6vw, 3.3rem);
          letter-spacing: 2px;
          text-transform: capitalize;
          margin: 0;
          line-height: 1;
        }

        @keyframes scrollTicker {
          0%   { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }

        @media (max-width: 480px) {
          .about-heading h1 {
            font-size: clamp(1.2rem, 4.5vw, 2rem);
            letter-spacing: clamp(0.5px, 0.3vw, 1px);
          }
        }
      `}</style>
    </>
  );
};

export default AboutUsPage;
