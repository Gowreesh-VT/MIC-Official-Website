'use client';

import React, { useState } from 'react';

interface LeaderboardEntry {
  name: string;
  points: number;
}

const FFCS_DATA: LeaderboardEntry[] = [
  { name: 'Alex', points: 980 },
  { name: 'Alex', points: 980 },
  { name: 'Alex', points: 980 },
];

const NON_FFCS_DATA: LeaderboardEntry[] = [
  { name: 'Alex', points: 980 },
  { name: 'Alex', points: 980 },
  { name: 'Alex', points: 980 },
];

// Custom pixel art Gold Trophy SVG matching reference design
const TrophyIcon = () => (
  <svg 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Handles outline */}
    <rect x="1" y="3" width="2" height="5" fill="#4D2304" />
    <rect x="13" y="3" width="2" height="5" fill="#4D2304" />
    <rect x="3" y="7" width="1" height="1" fill="#4D2304" />
    <rect x="12" y="7" width="1" height="1" fill="#4D2304" />

    {/* Handles fill */}
    <rect x="2" y="4" width="1" height="3" fill="#E5A039" />
    <rect x="13" y="4" width="1" height="3" fill="#E5A039" />

    {/* Cup Body Outline */}
    <rect x="4" y="2" width="8" height="6" fill="#4D2304" />
    
    {/* Cup Body Fill */}
    <rect x="5" y="3" width="6" height="4" fill="#E5A039" />
    <rect x="6" y="3" width="4" height="4" fill="#FCD722" />
    <rect x="7" y="3" width="2" height="4" fill="#FFE27A" />

    {/* Stem Outline */}
    <rect x="6" y="8" width="4" height="4" fill="#4D2304" />
    {/* Stem Fill */}
    <rect x="7" y="8" width="2" height="4" fill="#E5A039" />
    <rect x="8" y="8" width="1" height="4" fill="#FFE27A" />

    {/* Stand Outline */}
    <rect x="4" y="12" width="8" height="2" fill="#4D2304" />
    {/* Stand Fill */}
    <rect x="5" y="13" width="6" height="1" fill="#E5A039" />
    <rect x="6" y="13" width="4" height="1" fill="#FFE27A" />
  </svg>
);

// Custom Inline SVG for Medals (Ribbon + Medal Circle)
interface MedalProps {
  rank: 1 | 2 | 3;
}

const MedalIcon: React.FC<MedalProps> = ({ rank }) => {
  const getMedalColors = () => {
    switch (rank) {
      case 1:
        return { fill: '#FCD722', border: '#B87B21' };
      case 2:
        return { fill: '#DCDCDC', border: '#9E9E9E' };
      case 3:
        return { fill: '#C58B58', border: '#8C5D33' };
    }
  };

  const colors = getMedalColors();

  return (
    <svg 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-6 h-6 sm:w-8 sm:h-8 shrink-0"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* V-shaped Ribbon (Blue on Left, Red on Right) with black borders */}
      <path d="M8 2 L18 18 H14 L4 2 Z" fill="#4B69FF" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 2 L18 18 H22 L32 2 Z" fill="#FF4B4B" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Medal Body Circle */}
      <circle cx="18" cy="22" r="9" fill="#000000" />
      <circle cx="18" cy="22" r="7" fill={colors.fill} />
      <circle cx="18" cy="22" r="4" fill={colors.fill} stroke={colors.border} strokeWidth="1.5" />
      
      {/* Text Number */}
      <text
        x="18"
        y="25.5"
        fontFamily="'Press Start 2P', monospace"
        fontSize="9"
        fontWeight="bold"
        fill="#000000"
        textAnchor="middle"
      >
        {rank}
      </text>
    </svg>
  );
};

export function LeaderboardSignboard() {
  const [tab, setTab] = useState<'ffcs' | 'non-ffcs'>('ffcs');

  const currentData = tab === 'ffcs' ? FFCS_DATA : NON_FFCS_DATA;

  const getRowBg = (index: number) => {
    switch (index) {
      case 0:
        return '#CBE2FB'; // Light Blue
      case 1:
        return '#D2FBD2'; // Light Green
      case 2:
        return '#FBECD2'; // Light Yellow
      default:
        return '#FFFFFF';
    }
  };

  return (
    <>
      {/* ────────────────── MOBILE VIEW ────────────────── */}
      <div className="block sm:hidden w-full relative z-30 pointer-events-auto select-none">
        <div className="relative w-full bg-[#C8590C] border-[3.5px] border-black rounded-[22px] shadow-[6px_6px_0_rgba(0,0,0,0.35)] p-3.5 pt-4 pb-4 flex flex-col items-center select-none">
          {/* 4 Corner Bolts/Screws */}
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 bg-[#F8BEB3] border-[2px] border-black rounded-lg shadow-inner" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 bg-[#F8BEB3] border-[2px] border-black rounded-lg shadow-inner" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 bg-[#F8BEB3] border-[2px] border-black rounded-lg shadow-inner" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 bg-[#F8BEB3] border-[2px] border-black rounded-lg shadow-inner" />

          {/* 1. Header Title */}
          <div className="flex items-center justify-center gap-2 font-press-start my-1 text-center">
            <TrophyIcon />
            <h2
              className="text-[17px] text-[#E5A039] font-bold tracking-wider m-0 leading-none"
              style={{
                textShadow: '2px 2px 0 #4D2304, -1px -1px 0 #4D2304, 1px -1px 0 #4D2304, -1px 1px 0 #4D2304',
              }}
            >
              LEADERBOARD
            </h2>
          </div>

          {/* 2. Inner Scoreboard Container */}
          <div className="w-full bg-[#FBE4DF] border-[3.5px] border-black rounded-[16px] px-3 pt-6 pb-4 flex flex-col items-center gap-3 relative my-3 shadow-[inset_0_-3px_0_rgba(0,0,0,0.08)]">
            {/* FFCS / NON-FFCS MEMBERS Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#9B3D24] text-black font-press-start text-[10px] font-bold px-4 py-1.5 rounded-lg border-[2.5px] border-black shadow-[0_2px_0_rgba(0,0,0,0.2)] whitespace-nowrap">
              {tab === 'ffcs' ? 'FFCS MEMBERS' : 'NON-FFCS MEMBERS'}
            </div>

            {/* Table Header Pill */}
            <div className="w-full bg-[#9B3D24] text-black font-press-start text-[9.5px] font-bold px-4 py-1.5 rounded-lg border-[2.5px] border-black flex justify-between items-center text-center mt-1">
              <span className="w-[25%] text-left">RANK</span>
              <span className="w-[45%] text-center">NAME</span>
              <span className="w-[30%] text-right text-black">POINTS</span>
            </div>

            {/* Score Entry Rows (3 Rows) */}
            <div className="w-full flex flex-col gap-2.5 my-1">
              {currentData.map((entry, index) => (
                <div
                  key={entry.name + index}
                  className="w-full border-[2.5px] border-black rounded-[12px] px-3 py-2.5 flex items-center justify-between font-press-start font-bold text-black"
                  style={{
                    background: getRowBg(index),
                    boxShadow: 'inset 0 -2px 0 rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="w-[25%] flex items-center justify-start">
                    <MedalIcon rank={(index + 1) as 1 | 2 | 3} />
                  </div>
                  <span className="w-[45%] text-center truncate text-[14px]">
                    {entry.name}
                  </span>
                  <span className="w-[30%] text-right text-[14px]">
                    {entry.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Bottom SVG Buttons */}
          <div className="w-full flex justify-between gap-3 px-1 pt-1">
            <button
              onClick={() => setTab('ffcs')}
              className="relative flex-1 h-[42px] font-press-start text-[11px] font-bold text-black uppercase cursor-pointer flex items-center justify-center transition-transform active:translate-y-0.5 outline-none"
              style={{ transform: tab === 'ffcs' ? 'translateY(2px)' : 'translateY(0px)' }}
            >
              <img
                src="/ffcs.svg"
                alt="ffcs"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                style={{ filter: tab === 'ffcs' ? 'brightness(1.1)' : 'brightness(0.95)' }}
              />
              <span className="relative z-10">ffcs</span>
            </button>
            <button
              onClick={() => setTab('non-ffcs')}
              className="relative flex-1 h-[42px] font-press-start text-[11px] font-bold text-black uppercase cursor-pointer flex items-center justify-center transition-transform active:translate-y-0.5 outline-none"
              style={{ transform: tab === 'non-ffcs' ? 'translateY(2px)' : 'translateY(0px)' }}
            >
              <img
                src="/non-ffcs.svg"
                alt="non-ffcs"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                style={{ filter: tab === 'non-ffcs' ? 'brightness(1.1)' : 'brightness(0.95)' }}
              />
              <span className="relative z-10">non-ffcs</span>
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────── DESKTOP VIEW ────────────────── */}
      <div 
        className="hidden sm:block relative w-lg pointer-events-auto animate-fadeIn select-none" 
        style={{ 
          aspectRatio: '895 / 455',
          backgroundImage: "url('/signboard.svg')",
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* 1. Header Title */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 font-press-start pointer-events-none select-none"
          style={{ 
            top: '4.5%',
            textShadow: '2px 2px 0 #4D2304, -1px -1px 0 #4D2304, 1px -1px 0 #4D2304, -1px 1px 0 #4D2304',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          <TrophyIcon />
          <h2
            style={{
              fontSize: 'clamp(1.1rem, 2.7vw, 2.3rem)',
              color: '#E5A039',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              margin: 0,
              lineHeight: 1,
            }}
          >
            LEADERBOARD
          </h2>
        </div>

        {/* 2. Inner Scoreboard Container */}
        <div
          className="absolute border-[3.5px] border-black rounded-[16px] flex flex-col items-center pointer-events-none select-none"
          style={{
            top: '18%',
            left: '7.5%',
            width: '85%',
            height: '67%',
            background: '#FBE4DF',
            padding: '2% 3%',
            boxSizing: 'border-box',
            zIndex: 5,
          }}
        >
          {/* Members Badge */}
          <div
            className="border-[2.5px] border-black rounded-lg flex items-center justify-center font-press-start text-black font-bold whitespace-nowrap"
            style={{
              top: '-7%',
              width: '46%',
              height: '13%',
              background: '#9B3D24',
              fontSize: 'clamp(8px, 1.2vw, 13px)',
              boxShadow: '0 2px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
            {tab === 'ffcs' ? 'FFCS MEMBERS' : 'NON-FFCS MEMBERS'}
          </div>

          {/* Table Headers Pill */}
          <div
            className="w-full bg-[#9B3D24] text-black font-press-start font-bold border-[2.5px] border-black rounded-lg flex justify-between items-center px-6"
            style={{
              height: '13%',
              fontSize: 'clamp(9px, 1.2vw, 13px)',
              marginTop: '2.5%',
            }}
          >
            <span className="w-[25%] text-left">RANK</span>
            <span className="w-[45%] text-center">NAME</span>
            <span className="w-[30%] text-right">POINTS</span>
          </div>

          {/* Table Body / Leaderboard Rows */}
          <div className="w-full flex-1 flex flex-col justify-between my-2">
            {currentData.map((entry, index) => (
              <div
                key={entry.name + index}
                className="w-full flex items-center justify-between border-[3px] border-black rounded-[12px] px-5 font-press-start text-black font-bold"
                style={{
                  height: '28%',
                  background: getRowBg(index),
                  fontSize: 'clamp(11px, 1.6vw, 18px)',
                  boxShadow: 'inset 0 -2px 0 rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Medal Icon & Rank */}
                <div className="w-[25%] flex items-center justify-start">
                  <MedalIcon rank={(index + 1) as 1 | 2 | 3} />
                </div>

                {/* Name */}
                <span className="w-[45%] text-center truncate">{entry.name}</span>

                {/* Points */}
                <span className="w-[30%] text-right">{entry.points}</span>
              </div>
            ))}
          </div>

        </div>

        {/* 3. Bottom SVG Buttons */}
        {/* ffcs SVG Button */}
        <button
          onClick={() => setTab('ffcs')}
          className="absolute pointer-events-auto font-press-start font-bold text-black uppercase cursor-pointer flex items-center justify-center transition-all duration-100 active:scale-95 outline-none"
          style={{
            left: '7.5%',
            bottom: '3.5%',
            width: '135px',
            height: '42px',
            transform: tab === 'ffcs' ? 'translateY(2px)' : 'translateY(0px)',
            zIndex: 10,
          }}
        >
          <img
            src="/ffcs.svg"
            alt="ffcs"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            style={{ filter: tab === 'ffcs' ? 'brightness(1.1)' : 'brightness(0.95)' }}
          />
          <span className="relative z-10 text-[12px] sm:text-[14px]">ffcs</span>
        </button>

        {/* non-ffcs SVG Button */}
        <button
          onClick={() => setTab('non-ffcs')}
          className="absolute pointer-events-auto font-press-start font-bold text-black uppercase cursor-pointer flex items-center justify-center transition-all duration-100 active:scale-95 outline-none"
          style={{
            right: '7.5%',
            bottom: '3.5%',
            width: '200px',
            height: '42px',
            transform: tab === 'non-ffcs' ? 'translateY(2px)' : 'translateY(0px)',
            zIndex: 10,
          }}
        >
          <img
            src="/non-ffcs.svg"
            alt="non-ffcs"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            style={{ filter: tab === 'non-ffcs' ? 'brightness(1.1)' : 'brightness(0.95)' }}
          />
          <span className="relative z-10 text-[12px] sm:text-[14px]">non-ffcs</span>
        </button>

      </div>
    </>
  );
}
