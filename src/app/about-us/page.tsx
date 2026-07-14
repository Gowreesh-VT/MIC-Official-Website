"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDarkMode } from "@/hooks/useDarkMode";

// Cloud images for floating animation
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

// Pixel ghost animation
const PixelGhost = ({ style }: { style?: React.CSSProperties }) => (
  <div
    className="pixel-ghost"
    style={style}
  >
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="2" y="8" width="8" height="16" fill="#1f5ba4" />
      <rect x="10" y="6" width="8" height="18" fill="#1f5ba4" />
      <rect x="18" y="4" width="8" height="20" fill="#1f5ba4" />
      <rect x="26" y="6" width="8" height="18" fill="#1f5ba4" />
      <rect x="34" y="8" width="8" height="16" fill="#1f5ba4" />
      <rect x="2" y="24" width="8" height="8" fill="#1f5ba4" />
      <rect x="10" y="26" width="8" height="6" fill="#1f5ba4" />
      <rect x="18" y="26" width="8" height="6" fill="#1f5ba4" />
      <rect x="26" y="26" width="8" height="6" fill="#1f5ba4" />
      <rect x="34" y="24" width="8" height="8" fill="#1f5ba4" />
      <circle cx="8" cy="14" r="2" fill="#fff" />
      <circle cx="32" cy="14" r="2" fill="#fff" />
      <circle cx="8" cy="12" r="1" fill="#000" />
      <circle cx="32" cy="12" r="1" fill="#000" />
    </svg>
  </div>
);

// Cherry SVG component (pixel-art)
const Cherry = ({ style }: { style?: React.CSSProperties }) => (
  <div style={style} className="cherry-svg" aria-hidden>
    <svg width="46" height="46" viewBox="0 0 70 89" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10.2441" y="37.0833" width="21.3414" height="37.0833" fill="#F90202"/>
      <rect x="31.584" y="38.9374" width="2.56097" height="33.375" fill="#F90202"/>
      <rect x="7.68359" y="38.9374" width="2.56097" height="33.375" fill="#F90202"/>
      <rect x="34.1465" y="40.7916" width="2.56097" height="29.6667" fill="#F90202"/>
      <rect x="5.12109" y="40.7916" width="2.56097" height="29.6667" fill="#F90202"/>
      <rect x="36.709" y="44.4999" width="3.41463" height="22.25" fill="#F90202"/>
      <rect x="1.70703" y="44.4999" width="3.41463" height="22.25" fill="#F90202"/>
      <rect x="10.2441" y="63.9687" width="5.12194" height="5.5625" fill="#D9D9D9"/>
      <rect x="5.12109" y="58.4062" width="5.12194" height="5.5625" fill="#D9D9D9"/>
      <rect y="44.5" width="1.70731" height="22.25" fill="black"/>
      <rect x="1.70703" y="66.75" width="3.41463" height="1.85417" fill="black"/>
      <rect x="1.70703" y="42.6458" width="3.41463" height="1.85417" fill="black"/>
      <rect x="5.12109" y="70.4583" width="2.56097" height="1.85417" fill="black"/>
      <rect x="5.12109" y="38.9375" width="2.56097" height="1.85417" fill="black"/>
      <rect x="7.68359" y="72.3125" width="2.56097" height="1.85417" fill="black"/>
      <rect x="10.2441" y="74.1666" width="21.3414" height="1.85417" fill="black"/>
      <rect x="10.2441" y="35.2291" width="21.3414" height="1.85417" fill="black"/>
      <rect x="7.68359" y="37.0833" width="2.56097" height="1.85417" fill="black"/>
    </svg>
  </div>
);

// Ghost SVGs - four variants from user
const Ghost = ({ variant = 0, style }: { variant?: number; style?: React.CSSProperties }) => {
  if (variant === 1)
    return (
      <div style={style} className="ghost-svg" aria-hidden>
        <svg width="70" height="74" viewBox="0 0 70 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="34" width="5" height="40" fill="#F08B8D"/>
          <rect x="5" y="17" width="5" height="49" fill="#F08B8D"/>
          <rect x="10" y="12" width="5" height="46" fill="#F08B8D"/>
          <rect x="15" y="6" width="5" height="56" fill="#F08B8D"/>
          <rect x="20" y="6" width="5" height="67" fill="#F08B8D"/>
          <rect x="25" width="5" height="73" fill="#F08B8D"/>
          <rect x="30" width="10" height="58" fill="#F08B8D"/>
          <rect width="5" height="40" transform="matrix(-1 0 0 1 70 34)" fill="#F08B8D"/>
          <rect width="5" height="49" transform="matrix(-1 0 0 1 65 17)" fill="#F08B8D"/>
          <rect width="5" height="46" transform="matrix(-1 0 0 1 60 12)" fill="#F08B8D"/>
          <rect width="5" height="56" transform="matrix(-1 0 0 1 55 6)" fill="#F08B8D"/>
          <rect width="5" height="67" transform="matrix(-1 0 0 1 50 6)" fill="#F08B8D"/>
          <rect width="5" height="73" transform="matrix(-1 0 0 1 45 0)" fill="#F08B8D"/>
          <rect x="5" y="25" width="5" height="11" fill="#D9D9D9"/>
          <rect x="20" y="25" width="5" height="11" fill="#D9D9D9"/>
          <rect x="10" y="20" width="10" height="21" fill="#D9D9D9"/>
          <rect x="5" y="27" width="9" height="9" fill="#2026B8"/>
          <rect x="38" y="25" width="5" height="11" fill="#D9D9D9"/>
          <rect x="53" y="25" width="5" height="11" fill="#D9D9D9"/>
          <rect x="43" y="20" width="10" height="21" fill="#D9D9D9"/>
          <rect x="38" y="27" width="9" height="9" fill="#2026B8"/>
        </svg>
      </div>
    );

  if (variant === 2)
    return (
      <div style={style} className="ghost-svg" aria-hidden>
        <svg width="70" height="74" viewBox="0 0 70 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="34" width="5" height="40" fill="#0F29D2"/>
          <rect x="5" y="17" width="5" height="49" fill="#0F29D2"/>
          <rect x="10" y="12" width="5" height="46" fill="#0F29D2"/>
          <rect x="15" y="6" width="5" height="56" fill="#0F29D2"/>
          <rect x="20" y="6" width="5" height="67" fill="#0F29D2"/>
          <rect x="25" width="5" height="73" fill="#0F29D2"/>
          <rect x="30" width="10" height="58" fill="#0F29D2"/>
          <rect width="5" height="40" transform="matrix(-1 0 0 1 70 34)" fill="#0F29D2"/>
          <rect width="5" height="49" transform="matrix(-1 0 0 1 65 17)" fill="#0F29D2"/>
          <rect width="5" height="46" transform="matrix(-1 0 0 1 60 12)" fill="#0F29D2"/>
          <rect width="5" height="56" transform="matrix(-1 0 0 1 55 6)" fill="#0F29D2"/>
          <rect width="5" height="67" transform="matrix(-1 0 0 1 50 6)" fill="#0F29D2"/>
          <rect width="5" height="73" transform="matrix(-1 0 0 1 45 0)" fill="#0F29D2"/>
          <rect x="5" y="25" width="5" height="11" fill="#D9D9D9"/>
          <rect x="20" y="25" width="5" height="11" fill="#D9D9D9"/>
          <rect x="10" y="20" width="10" height="21" fill="#D9D9D9"/>
          <rect x="5" y="27" width="9" height="9" fill="#2026B8"/>
          <rect x="38" y="25" width="5" height="11" fill="#D9D9D9"/>
          <rect x="53" y="25" width="5" height="11" fill="#D9D9D9"/>
          <rect x="43" y="20" width="10" height="21" fill="#D9D9D9"/>
          <rect x="38" y="27" width="9" height="9" fill="#2026B8"/>
        </svg>
      </div>
    );

  if (variant === 3)
    return (
      <div style={style} className="ghost-svg" aria-hidden>
        <svg width="70" height="74" viewBox="0 0 70 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="34" width="5" height="40" fill="#D2770F"/>
          <rect x="5" y="17" width="5" height="49" fill="#D2770F"/>
          <rect x="10" y="12" width="5" height="46" fill="#D2770F"/>
          <rect x="15" y="6" width="5" height="56" fill="#D2770F"/>
          <rect x="20" y="6" width="5" height="67" fill="#D2770F"/>
          <rect x="25" width="5" height="73" fill="#D2770F"/>
          <rect x="30" width="10" height="58" fill="#D2770F"/>
          <rect width="5" height="40" transform="matrix(-1 0 0 1 70 34)" fill="#D2770F"/>
          <rect width="5" height="49" transform="matrix(-1 0 0 1 65 17)" fill="#D2770F"/>
          <rect width="5" height="46" transform="matrix(-1 0 0 1 60 12)" fill="#D2770F"/>
          <rect width="5" height="56" transform="matrix(-1 0 0 1 55 6)" fill="#D2770F"/>
          <rect width="5" height="67" transform="matrix(-1 0 0 1 50 6)" fill="#D2770F"/>
          <rect width="5" height="73" transform="matrix(-1 0 0 1 45 0)" fill="#D2770F"/>
        </svg>
      </div>
    );

  // default (variant 0)
  return (
    <div style={style} className="ghost-svg" aria-hidden>
      <svg width="70" height="74" viewBox="0 0 70 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="34" width="5" height="40" fill="#D20F12"/>
        <rect x="5" y="17" width="5" height="49" fill="#D20F12"/>
        <rect x="10" y="12" width="5" height="46" fill="#D20F12"/>
        <rect x="15" y="6" width="5" height="56" fill="#D20F12"/>
        <rect x="20" y="6" width="5" height="67" fill="#D20F12"/>
        <rect x="25" width="5" height="73" fill="#D20F12"/>
        <rect x="30" width="10" height="58" fill="#D20F12"/>
        <rect width="5" height="40" transform="matrix(-1 0 0 1 70 34)" fill="#D20F12"/>
        <rect width="5" height="49" transform="matrix(-1 0 0 1 65 17)" fill="#D20F12"/>
        <rect width="5" height="46" transform="matrix(-1 0 0 1 60 12)" fill="#D20F12"/>
        <rect width="5" height="56" transform="matrix(-1 0 0 1 55 6)" fill="#D20F12"/>
        <rect width="5" height="67" transform="matrix(-1 0 0 1 50 6)" fill="#D20F12"/>
        <rect width="5" height="73" transform="matrix(-1 0 0 1 45 0)" fill="#D20F12"/>
        <rect x="5" y="25" width="5" height="11" fill="#D9D9D9"/>
        <rect x="20" y="25" width="5" height="11" fill="#D9D9D9"/>
        <rect x="10" y="20" width="10" height="21" fill="#D9D9D9"/>
        <rect x="5" y="27" width="9" height="9" fill="#2026B8"/>
        <rect x="38" y="25" width="5" height="11" fill="#D9D9D9"/>
        <rect x="53" y="25" width="5" height="11" fill="#D9D9D9"/>
        <rect x="43" y="20" width="10" height="21" fill="#D9D9D9"/>
        <rect x="38" y="27" width="9" height="9" fill="#2026B8"/>
      </svg>
    </div>
  );
};

// Social media icon component with new logos
const SocialIcon = ({ icon, label, href }: { icon: string; label: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon-link" title={label}>
    <div className="social-icon" title={label}>
      {icon === "instagram" && (
        <svg width="82" height="78" viewBox="0 0 82 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12.5" y="12.5" width="66" height="62" fill="#000809" stroke="black" strokeWidth="7"/>
          <rect x="3.5" y="3.5" width="66" height="62" fill="#B3F2FF" stroke="black" strokeWidth="7"/>
          <rect x="17" y="23.9497" width="3.42757" height="20.375" fill="black"/>
          <rect x="52.0371" y="23.9497" width="3.42757" height="20.7558" fill="black"/>
          <rect x="46.3242" y="49.8469" width="3.42757" height="20.375" transform="rotate(90 46.3242 49.8469)" fill="black"/>
          <rect x="25.9512" y="18.4276" width="3.42757" height="20.375" transform="rotate(-90 25.9512 18.4276)" fill="black"/>
          <rect x="18.5234" y="20.7127" width="3.42757" height="3.23715" fill="black"/>
          <rect width="3.42757" height="3.23715" transform="matrix(-1 0 0 1 53.752 20.9031)" fill="black"/>
          <rect width="3.42757" height="3.23715" transform="matrix(1 0 0 -1 18.5234 47.5618)" fill="black"/>
          <rect x="53.752" y="47.9429" width="3.42757" height="3.23715" transform="rotate(180 53.752 47.9429)" fill="black"/>
          <rect x="20.2363" y="18.2372" width="3.42757" height="3.23715" fill="black"/>
          <rect width="3.42757" height="3.23715" transform="matrix(-1 0 0 1 52.0371 18.4276)" fill="black"/>
          <rect width="3.42757" height="3.23715" transform="matrix(1 0 0 -1 20.2363 50.0373)" fill="black"/>
          <rect x="52.0371" y="50.4183" width="3.42757" height="3.23715" transform="rotate(180 52.0371 50.4183)" fill="black"/>
          <rect x="22.5215" y="16.5233" width="3.42757" height="3.23715" fill="black"/>
          <rect width="3.42757" height="3.23715" transform="matrix(-1 0 0 1 49.752 16.7137)" fill="black"/>
          <rect width="3.42757" height="3.23715" transform="matrix(1 0 0 -1 22.5215 51.7512)" fill="black"/>
          <rect x="49.752" y="52.132" width="3.42757" height="3.23715" transform="rotate(180 49.752 52.132)" fill="black"/>
          <rect x="25.9512" y="29.8528" width="3.61799" height="8.37851" fill="black"/>
          <rect x="42.3262" y="29.8528" width="3.61799" height="8.37851" fill="black"/>
          <rect x="40.4219" y="24.3307" width="3.42757" height="8.75935" transform="rotate(90 40.4219 24.3307)" fill="black"/>
          <rect x="31.8535" y="43.9438" width="3.42757" height="8.37851" transform="rotate(-90 31.8535 43.9438)" fill="black"/>
          <rect x="28.6152" y="38.2314" width="3.23715" height="3.42757" fill="black"/>
          <rect x="40.2305" y="38.2314" width="3.23715" height="3.42757" fill="black"/>
          <rect x="40.4219" y="26.4252" width="3.23715" height="3.42757" fill="black"/>
          <rect x="28.4258" y="26.4252" width="3.23715" height="3.42757" fill="black"/>
          <rect x="44.6113" y="22.236" width="3.23715" height="3.42757" fill="black"/>
        </svg>
      )}
      {icon === "linkedin" && (
        <svg width="82" height="78" viewBox="0 0 82 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12.5" y="12.5" width="66" height="62" fill="#000809" stroke="black" strokeWidth="7"/>
          <rect x="3.5" y="3.5" width="66" height="62" fill="#FFB3E6" stroke="black" strokeWidth="7"/>
          <rect x="15" y="20.0712" width="2.84558" height="30.7254" fill="black"/>
          <rect x="55.1543" y="20.3691" width="2.84558" height="30.4271" fill="black"/>
          <rect x="52.625" y="15" width="2.68475" height="32.25" transform="rotate(90 52.625 15)" fill="black"/>
          <rect x="20.375" y="55.8677" width="2.68475" height="32.25" transform="rotate(-90 20.375 55.8677)" fill="black"/>
          <rect x="17.5293" y="17.6851" width="2.84558" height="2.68475" fill="black"/>
          <rect x="52.625" y="17.6851" width="2.84558" height="2.68475" fill="black"/>
          <rect x="52.625" y="50.7964" width="2.84558" height="2.68475" fill="black"/>
          <rect x="17.5293" y="50.7964" width="2.84558" height="2.68475" fill="black"/>
          <rect x="22.9043" y="30.2134" width="5.37499" height="17.8983" fill="black"/>
          <rect x="22.9043" y="22.7559" width="5.37499" height="5.07119" fill="black"/>
          <rect x="33.6543" y="30.2134" width="5.37499" height="17.8983" fill="black"/>
          <rect x="44.7207" y="33.1968" width="5.37499" height="14.9153" fill="black"/>
          <rect x="37.4492" y="32.8984" width="12.647" height="2.68475" fill="black"/>
          <rect x="41.875" y="30.2134" width="5.37499" height="2.68475" fill="black"/>
        </svg>
      )}
      {icon === "mail" && (
        <svg width="82" height="78" viewBox="0 0 82 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12.5" y="12.5" width="66" height="62" fill="#000809" stroke="black" strokeWidth="7"/>
          <rect x="3.5" y="3.5" width="66" height="62" fill="#E6B3FF" stroke="black" strokeWidth="7"/>
          <path d="M28.3549 21H18V49H25.4505V34.0411H27.8498V36.5982H32.901V39.1553H35.1741V41.5845H37.9522V39.1553H40.3515V36.4703H45.1502V33.9132H47.5495V49H55V21.3836H45.1502V23.9406H42.7509V26.3699H40.3515V28.9269H33.0273V26.3699H30.5017V24.0685H28.3549V21Z" stroke="black" strokeWidth="3"/>
        </svg>
      )}
    </div>
  </a>
);

<style jsx>{`
  .social-icon-link {
    text-decoration: none;
    cursor: pointer;
  }
`}</style>

function getThemeColors(isDarkMode: boolean) {
  return {
    background: "linear-gradient(to bottom, #0066cc 0%, #00ccff 100%)",
    headingColor: "#000",
    headingTextShadow: "3px 3px 0 #fff, 6px 6px 0 #000",
    cardTextColor: "#333",
  };
}

// Pixel Art Card Component
const PixelCard = ({
  borderColor,
  backgroundColor,
  title,
  style,
}: {
  borderColor: string;
  backgroundColor: string;
  title: string;
  style?: React.CSSProperties;
}) => (
  <div
    className="pixel-card"
    style={{
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      ...style,
    }}
  >
    <div className="pixel-border-top"></div>
    <div className="pixel-border-corner top-left"></div>
    <div className="pixel-border-corner top-right"></div>
    <div className="pixel-border-corner bottom-left"></div>
    <div className="pixel-border-corner bottom-right"></div>
    <style jsx>{`
      .pixel-card {
        width: 240px;
        height: 200px;
        border: 6px solid;
        position: relative;
        box-sizing: border-box;
      }

      .pixel-border-corner {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: inherit;
        border: 3px solid;
        border-color: inherit;
      }

      .top-left {
        top: -9px;
        left: -9px;
      }

      .top-right {
        top: -9px;
        right: -9px;
      }

      .bottom-left {
        bottom: -9px;
        left: -9px;
      }

      .bottom-right {
        bottom: -9px;
        right: -9px;
      }

      .pixel-border-top {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 20px;
        background-color: inherit;
        border: 3px solid;
        border-color: inherit;
      }
    `}</style>
  </div>
);

const AboutUsPage: React.FC = () => {
  const isDarkMode = useDarkMode();
  const cloudPositions = [
    useCloudFloat({ baseTop: 100, baseLeft: 50, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 300, baseLeft: 800, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 450, baseLeft: 150, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 350, baseLeft: 1100, amplitude: 28, speed: 1.2, phase: 3 }),
  ];

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
    document.documentElement.style.minHeight = "100vh";
  }, []);

  const themeColors = getThemeColors(isDarkMode);

  return (
    <>
      <div
        className="page-container"
        style={{
          backgroundImage: themeColors.background,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          userSelect: "none",
          touchAction: "none",
          overflow: "hidden",
          minHeight: "100vh",
          position: "relative",
          transition: "background 0.5s ease",
        }}
      >
        {/* Floating Clouds */}
        {cloudPositions.map((pos, i) => (
          <Image
            key={i}
            src={cloudImages[i % cloudImages.length]}
            alt={`Cloud ${i + 1}`}
            width={180}
            height={120}
            style={{
              position: "absolute",
              top: pos.top,
              left: pos.left,
              zIndex: 2,
              pointerEvents: "none",
              userSelect: "none",
              opacity: 0.85,
              transition: "top 0.18s linear",
            }}
            priority
          />
        ))}

        {/* Ghosts (replaced PixelGhost with user SVGs) */}
        <Ghost variant={1} style={{ position: "absolute", top: "22%", left: "10%", zIndex: 3, transform: "scale(0.9)" }} />
        <Ghost variant={2} style={{ position: "absolute", top: "40%", left: "28%", zIndex: 3, transform: "scale(0.95)" }} />
        <Ghost variant={0} style={{ position: "absolute", top: "26%", left: "60%", zIndex: 3, transform: "scale(0.9)" }} />
        <Ghost variant={3} style={{ position: "absolute", top: "62%", left: "78%", zIndex: 3, transform: "scale(0.85)" }} />

        {/* Pac-Man style character */}
        <div
          className="pacman"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
          <svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 56.707 0)" fill="black"/>
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 54.8789 69.643)" fill="black"/>
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 42.0742 34.8215)" fill="black"/>
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 69.5117 25)" fill="black"/>
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 69.5117 44.643)" fill="black"/>
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 54.8789 39.2855)" fill="black"/>
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 54.8789 30.357)" fill="black"/>
            <rect width="9.14634" height="5.35714" transform="matrix(-1 0 0 1 25.6094 5.35699)" fill="black"/>
            <rect width="7.31707" height="5.35714" transform="matrix(-1 0 0 1 23.7812 64.2855)" fill="black"/>
            <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 16.4629 58.9285)" fill="black"/>
            <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 17.3789 10.7145)" fill="black"/>
            <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 63.1094 5.35699)" fill="black"/>
            <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 69.5117 10.7145)" fill="black"/>
            <rect width="6.40244" height="5.35714" transform="matrix(-1 0 0 1 69.5117 58.9285)" fill="black"/>
            <rect width="8.23171" height="5.35714" transform="matrix(-1 0 0 1 63.1094 64.2855)" fill="black"/>
            <rect width="5.4878" height="8.92857" transform="matrix(-1 0 0 1 10.9766 16.0715)" fill="black"/>
            <rect width="5.4878" height="8.92857" transform="matrix(-1 0 0 1 75 16.0715)" fill="black"/>
            <rect width="5.4878" height="8.92857" transform="matrix(-1 0 0 1 75 50)" fill="black"/>
            <rect width="5.4878" height="8.92857" transform="matrix(-1 0 0 1 10.0605 50)" fill="black"/>
            <rect width="5.4878" height="25" transform="matrix(-1 0 0 1 5.48828 25)" fill="black"/>
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 56.707 5.35699)" fill="#F8EB39"/>
            <rect width="31.0976" height="5.35714" transform="matrix(-1 0 0 1 54.877 64.2856)" fill="#F8EB39"/>
            <rect width="46.6463" height="5.35714" transform="matrix(-1 0 0 1 63.1094 10.7145)" fill="#F8EB39"/>
            <rect width="46.6463" height="5.35714" transform="matrix(-1 0 0 1 63.1094 58.9286)" fill="#F8EB39"/>
            <rect width="49.3902" height="5.35714" transform="matrix(-1 0 0 1 54.877 25.0001)" fill="#F8EB39"/>
            <rect width="36.5854" height="5.35714" transform="matrix(-1 0 0 1 42.0723 30.3571)" fill="#F8EB39"/>
            <rect width="20.122" height="5.35714" transform="matrix(-1 0 0 1 25.6094 35.7145)" fill="#F8EB39"/>
            <rect width="36.5854" height="5.35714" transform="matrix(-1 0 0 1 42.0723 39.2856)" fill="#F8EB39"/>
            <rect width="49.3902" height="5.35714" transform="matrix(-1 0 0 1 54.877 44.6431)" fill="#F8EB39"/>
            <rect width="58.5366" height="8.92857" transform="matrix(-1 0 0 1 69.5117 16.0715)" fill="#F8EB39"/>
            <rect width="59.4512" height="8.92857" transform="matrix(-1 0 0 1 69.5117 50.0001)" fill="#F8EB39"/>
          </svg>
        </div>

        <div className="about-heading">
          <h1
            style={{
              color: "#000",
              textShadow: "3px 3px 0 #000",
              transition: "color 0.5s ease, text-shadow 0.5s ease",
            }}
          >
            About Us
          </h1>
        </div>

        <div className="cards-container">
          <div className="card-wrapper">
            <div className="cherry-top"><Cherry /></div>
            <PixelCard borderColor="#0066ff" backgroundColor="#66ffff" title="Card 1" />
          </div>

          <div className="card-wrapper">
            <div className="cherry-top"><Cherry /></div>
            <PixelCard borderColor="#ffcc00" backgroundColor="#ffff99" title="Card 2" />
          </div>

          <div className="card-wrapper">
            <div className="cherry-top"><Cherry /></div>
            <PixelCard borderColor="#ff6666" backgroundColor="#ffcccc" title="Card 3" />
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="contact-section">
          <h2>Contact Us</h2>
          <div className="social-icons">
            <SocialIcon icon="instagram" label="Instagram" href="https://www.instagram.com/microsoft.innovations.vitc/" />
            <SocialIcon icon="linkedin" label="LinkedIn" href="https://www.linkedin.com/company/microsoft-innovations-club-vitc/" />
            <SocialIcon icon="mail" label="Email" href="mailto:mic.vit.chennai@gmail.com" />
          </div>
        </div>

        {/* Footer Text */}
        <div className="footer-text">
          <p>ROSOFT INNOVATIONS CLUB TENURE 2026-2027 MICRE</p>
        </div>
      </div>

      <style jsx>{`
        .page-container {
          position: relative;
          width: 100vw;
          max-width: 100vw;
          overflow: hidden;
        }

        .about-heading {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 60px auto 40px auto;
          text-align: center;
          user-select: none;
          pointer-events: none;
          padding: 0 20px;
        }

        .about-heading h1 {
          font-family: "Press Start 2P", monospace;
          font-size: clamp(2rem, 6vw, 3.5rem);
          letter-spacing: 3px;
          text-transform: capitalize;
          margin: 0;
          line-height: 1;
        }

        .cards-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          gap: 40px;
          width: 100%;
          margin: 40px auto;
          padding: 0 20px;
          min-height: 300px;
        }

        .card-wrapper {
          position: relative;
          display: inline-block;
        }

        .cherry-top {
          position: absolute;
          top: -22px;
          left: -18px;
          z-index: 6;
          width: 46px;
          height: 46px;
          pointer-events: none;
        }

        .contact-section {
          width: 100%;
          background: linear-gradient(90deg, #cc00cc, #cc00cc);
          border: 6px solid #000;
          padding: 30px;
          margin: 40px 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .contact-section h2 {
          font-family: "Press Start 2P", monospace;
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          color: #fff;
          text-shadow: 3px 3px 0 #000;
          margin: 0;
          letter-spacing: 2px;
        }

        .social-icons {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .social-icon-link {
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .social-icon-link:hover {
          transform: scale(1.1);
        }

        .social-icon {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer-text {
          width: 100%;
          background: linear-gradient(90deg, #ff9900, #ff9900);
          padding: 15px;
          text-align: center;
          border-top: 3px solid #000;
          border-bottom: 3px solid #000;
        }

        .footer-text p {
          font-family: "Press Start 2P", monospace;
          font-size: clamp(0.6rem, 2vw, 1rem);
          color: #000;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .pacman {
          animation: pacman-move 4s infinite;
        }

        @keyframes pacman-move {
          0%, 100% { transform: translateX(-50%); }
          50% { transform: translateX(calc(-50% + 100px)); }
        }

        @media (max-width: 900px) {
          .cards-container {
            gap: 30px;
          }

          .contact-section {
            margin: 30px 20px;
            padding: 20px;
          }
        }

        @media (max-width: 600px) {
          .cards-container {
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin: 30px auto;
          }

          .about-heading {
            margin: 40px auto 30px auto;
          }

          .about-heading h1 {
            font-size: clamp(1.2rem, 5vw, 2rem);
            letter-spacing: 1px;
          }

          .contact-section {
            margin: 20px 10px;
            padding: 15px;
          }

          .contact-section h2 {
            font-size: clamp(1rem, 3vw, 1.5rem);
          }

          .social-icons {
            gap: 20px;
          }

          .footer-text p {
            font-size: clamp(0.5rem, 1.5vw, 0.8rem);
          }
        }
      `}</style>
    </>
  );
};

export default AboutUsPage;
