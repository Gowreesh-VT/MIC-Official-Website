'use client';

import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import Image from 'next/image';
import PresidentCard from './components/PresidentCard';
import VicePresidentCard from './components/VicePresidentCard';
import ManagementSecCard from './components/ManagementSecCard';
import TechSecCard from './components/TechSecCard';
import NonTechSecCard from './components/NonTechSecCard';
import RedCard from './components/RedCard';
import BlueCard from './components/BlueCard';
import GreenCard from './components/GreenCard';
import YellowCard from './components/YellowCard';


interface CloudFloatOptions {
  baseTop: string | number;
  baseLeft: string | number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

interface LeadData {
  name: string;
  title: string;
  imageSrc: string;
  tenure: string;
  imagePosition?: string;
}

const leadsData: LeadData[] = [
  // 2025-2026 Data
  { name: 'Sanjay Dinesh', title: 'AIML', imageSrc: '/images/mic_departments/aiml_sanjay.jpg', tenure: '2025-2026' },
  { name: 'Abhinav Kumar V', title: 'AIML', imageSrc: '/images/mic_departments/aiml_abhinav.jpg', tenure: '2025-2026' },
  { name: 'Aman', title: 'CP', imageSrc: '/images/mic_departments/cp_aman.jpg', tenure: '2025-2026' },
  { name: 'Anmol Singh', title: 'CP', imageSrc: '/images/mic_departments/cp_anmol.jpg', tenure: '2025-2026' },
  { name: 'Aagney', title: 'Content', imageSrc: '/images/mic_departments/content_aagney.jpg', tenure: '2025-2026' },
  { name: 'Shambhavi', title: 'Content', imageSrc: '/images/mic_departments/content_shambhavi.jpg', tenure: '2025-2026' },
  { name: 'Pranjal Mitra', title: 'Cyber Security', imageSrc: '/images/mic_departments/cs_pranjal.jpg', tenure: '2025-2026' },
  { name: 'Mohammed Tahir', title: 'Cyber Security', imageSrc: '/images/mic_departments/cs_mohammed.jpg', tenure: '2025-2026' },
  { name: 'Gladwin Daniel', title: 'Design', imageSrc: '/images/mic_departments/design_Gladwin.jpg', tenure: '2025-2026' },
  { name: 'Jahnavi Nair', title: 'Design', imageSrc: '/images/mic_departments/design_Jahnavi.jpg', tenure: '2025-2026' },
  { name: 'Rakshana V', title: 'Development', imageSrc: '/images/mic_departments/dev_rakshana.jpg', tenure: '2025-2026' },
  { name: 'Mithil Girish', title: 'Development', imageSrc: '/images/mic_departments/dev_mithil.jpg', tenure: '2025-2026' },
  { name: 'Samyak Srijan', title: 'Entrepreneurship', imageSrc: '/images/mic_departments/entre_samyak.jpg', tenure: '2025-2026' },
  { name: 'Abishek B S', title: 'Entrepreneurship', imageSrc: '/images/mic_departments/entre_abhishek.jpg', tenure: '2025-2026' },
  { name: 'Jefrey Jose D', title: 'Management', imageSrc: '/images/mic_departments/man_jefrey.jpg', tenure: '2025-2026' },
  { name: 'Namita Sathish', title: 'Management', imageSrc: '/images/mic_departments/man_namitha.jpg', tenure: '2025-2026' },
  { name: 'Bhargavi Deshmukh', title: 'Management', imageSrc: '/images/mic_departments/man_bhargavi.jpg', tenure: '2025-2026' },
  { name: 'Anjum Sana', title: 'Social Media', imageSrc: '/images/mic_departments/so_sana.jpg', tenure: '2025-2026' },
  { name: 'Mithun Miras', title: 'Social Media', imageSrc: '/images/mic_departments/so_mithun.jpg', tenure: '2025-2026' },
  { name: 'Sravan Kowsik G', title: 'UI/UX', imageSrc: '/images/mic_departments/uiux_shravan.jpg', tenure: '2025-2026' },
  { name: 'Richika Rani', title: 'UI/UX', imageSrc: '/images/mic_departments/uiux_richika.jpg', tenure: '2025-2026' },

  // 2026-2027 Data
  { name: 'Gowreesh V T', title: 'Dev', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEUtYJgRdHmv6NAQPqtFZLJxCe2437IdY1nlS9', tenure: '2026-2027' },
  { name: 'Sri Saidhakshini', title: 'Dev', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEHHbAQd1ltk8sCVhvgKTpUzQyXnafuj70O5i4', tenure: '2026-2027', imagePosition: '70% center' },
  { name: 'Arya Jayram M', title: 'AIML', imageSrc: 'https://cdn.phototourl.com/free/2026-06-29-fa5ff916-3c70-4785-9f16-b2ec493fe09c.jpg', tenure: '2026-2027' },
  { name: 'Anas Arfeen', title: 'AIML', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKE8Fjl68qLQ2xVrP4AaXvOqzW0g1dcDfemSwsp', tenure: '2026-2027' },
  { name: 'Heba Jahan', title: 'UI/UX', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEnaBdf8X4XfKE8dVYAS3iJPGLUQthW0u6F1xw', tenure: '2026-2027' },
  { name: 'Maanya Ramesh', title: 'UI/UX', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEQH2Xqh6l1Hn7zksoqKEgIFuwlcDyadAj6SP0', tenure: '2026-2027' },
  { name: 'Suhani', title: 'Management', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKECWEPkHeJaBN8xfuV7iYTPHK3QA0SXWp2tUhv', tenure: '2026-2027' },
  { name: 'Balaganesh', title: 'Management', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEuNg9ycz4GRJyS3pjE8dT6PNtDZVeIqY7LOAF', tenure: '2026-2027' },
  { name: 'Ayan Chogle', title: 'Cyber Security', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKElY1TXjUmuIWeFadG1QP8jwZAfYKCcb4pk30y', tenure: '2026-2027' },
  { name: 'Suyash', title: 'Cyber Security', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKECVRDdceJaBN8xfuV7iYTPHK3QA0SXWp2tUhv', tenure: '2026-2027' },
  { name: 'Bhuvan Nayak', title: 'CP', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEk1qSuRaHF5hwn3uCcqPm4ORVQJW8SBvgpL0A', tenure: '2026-2027' },
  { name: 'Vraj Mevada', title: 'CP', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEH8ehus1ltk8sCVhvgKTpUzQyXnafuj70O5i4', tenure: '2026-2027' },
  { name: 'Humaira', title: 'Social Media & Content', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEe8IYxV76RN0mDpnTUjK56G2u38oCVSxg7rzQ', tenure: '2026-2027' },
  { name: 'Meera Sujith', title: 'Design', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEOSinyiWot5fUOEcXdyaZNTrPYb7MSJQIlwzH', tenure: '2026-2027' },
  { name: 'Vardaa', title: 'Entrepreneurship', imageSrc: 'https://cdn.phototourl.com/free/2026-06-29-6c7e264c-566f-4c2f-a1cb-4f468bccdcb8.jpg', tenure: '2026-2027' },
  { name: 'Tanushree', title: 'Entrepreneurship', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEidRRO6o4CjI3DVaMq6R02UgBwNZ7AJy5leEn', tenure: '2026-2027' },
  { name: 'Vansh Aggarwal', title: 'MLSA', imageSrc: 'https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEF5PHQ2A09oihcYfavCU8QVN7Oswmu3e6j14G', tenure: '2026-2027' },
];

const cardOrder = [RedCard, BlueCard, GreenCard, YellowCard];

function useCloudFloat({ baseTop, baseLeft, amplitude = 30, speed = 1, phase = 0 }: CloudFloatOptions) {
  const [top, setTop] = useState(baseTop);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    function animate() {
      frame.current += 1;
      const t = frame.current / 60;
      setTop(Number(baseTop) + Math.sin(t * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
}

const Cloud = memo(({
  position,
  src,
  index,
  view
}: {
  position: { top: string | number; left: string | number };
  src: string;
  index: number;
  view: 'core' | 'board' | 'departments';
}) => (
  <Image
    src={src}
    alt={`Cloud ${index + 1}`}
    width={355}
    height={228}
    style={{
      position: view === 'board' ? 'absolute' : 'fixed',
      top: position.top,
      left: position.left,
      zIndex: 2,
      pointerEvents: 'none'
    }}
  />
));

Cloud.displayName = 'Cloud';

const MeetTheBoardPage: React.FC = () => {
  const [view, setView] = useState<'core' | 'board' | 'departments'>('core');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const selectedTenure = '2026-2027';

  // Define cloud positions using hooks at the top level
  const cloudPositions = [
    useCloudFloat({ baseTop: 154, baseLeft: -12, amplitude: 25, speed: 0.8, phase: 0 }),
    useCloudFloat({ baseTop: 466, baseLeft: 22, amplitude: 35, speed: 1.1, phase: 1 }),
    useCloudFloat({ baseTop: 700, baseLeft: 232, amplitude: 30, speed: 0.9, phase: 2 }),
    useCloudFloat({ baseTop: 790, baseLeft: 1003, amplitude: 28, speed: 1.2, phase: 3 }),
    useCloudFloat({ baseTop: 604.98, baseLeft: 1331, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 127.98, baseLeft: 1142, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: -23, baseLeft: 1500, amplitude: 22, speed: 1.05, phase: 6 }),
    useCloudFloat({ baseTop: 604.98, baseLeft: 1400, amplitude: 32, speed: 1.0, phase: 4 }),
    useCloudFloat({ baseTop: 127.98, baseLeft: 1600, amplitude: 27, speed: 1.3, phase: 5 }),
    useCloudFloat({ baseTop: 600, baseLeft: 1600, amplitude: 22, speed: 1.05, phase: 6 }),
  ];

  const cloudImages = useMemo(() => [
    '/images/cloud1.png', '/images/cloud2.png', '/images/cloud1.png',
    '/images/cloud3.png', '/images/cloud3.png', '/images/cloud2.png',
    '/images/cloud1.png', '/images/cloud3.png', '/images/cloud2.png',
    '/images/cloud1.png'
  ], []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Track window width for responsive grid
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Add transparent scrollbar styles
    const style = document.createElement('style');
    style.textContent = `
      /* Transparent scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
      }
      
      /* For Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
      }
    `;
    document.head.appendChild(style);

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    // Set scroll behavior based on view
    if (view === 'core') {
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';
    }

    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault();
    };
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventKeyboardZoom);

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.head.removeChild(style);
    };
  }, [view]); // Add view as dependency to re-run when view changes

  const getThemeColors = () => {
    return isDarkMode
      ? {
        background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
        lineColor: "#0B3A79",
        borderColor: "#1e40af",
        textColor: "text-white",
        gridOpacity: "rgba(255, 255, 255, 0.1)"
      }
      : {
        background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
        lineColor: "#1e88e5",
        borderColor: "#3b82f6",
        textColor: "text-gray-900",
        gridOpacity: "rgba(255, 255, 255, 0.3)"
      };
  };

  const themeColors = getThemeColors();

  // Filter leads data by selected tenure
  const filteredLeadsData = leadsData.filter(lead => lead.tenure === selectedTenure);

  // Responsive cards per row & scale
  const cardsPerRow = windowWidth < 640 ? 1 : windowWidth < 1100 ? 2 : 4;
  // Scale the row so 4 cards always fit; minimum scale 0.5
  const CARD_W = 327;
  const CARD_GAP = 32; // space-x-8 = 2rem = 32px
  const rowTotalW = cardsPerRow * CARD_W + (cardsPerRow - 1) * CARD_GAP;
  const availableW = windowWidth - 32; // subtract page padding
  const rowScale = rowTotalW > availableW ? Math.max(0.5, availableW / rowTotalW) : 1;

  // Prepare rows for departments view
  const rows: typeof filteredLeadsData[] = [];
  for (let i = 0; i < filteredLeadsData.length; i += cardsPerRow) {
    rows.push(filteredLeadsData.slice(i, i + cardsPerRow));
  }

  return (
    <div className="full-screen-container">
      <div className="content-wrapper">
        <div
          className={`${view === 'core' ? 'h-screen' : 'min-h-screen'} w-full flex flex-col items-center px-4 py-8 relative overflow-x-hidden`}
          style={{
            backgroundImage: `
              linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
              linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
              ${themeColors.background}
            `,
            backgroundSize: "30px 30px, 30px 30px, 100% 100%",
            backgroundRepeat: "repeat, repeat, no-repeat",
            backgroundPosition: "top left, top left, center",
            userSelect: "none",
          }}
        >
          {cloudPositions.map((pos, i) => (
            <Cloud
              key={i}
              position={pos}
              src={cloudImages[i]}
              index={i}
              view={view}
            />
          ))}

          {/* Stars / Dots - only show in departments view
          {view === 'departments' && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: 1154, height: 364, zIndex: 2 }}>
              <svg width="1154" height="364" viewBox="0 0 1154 364" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="1150.02" cy="55" rx="3.98" ry="4" fill="white" />
                <ellipse cx="949.88" cy="19" rx="3.98" ry="4" fill="white" />
                <ellipse cx="203.12" cy="4" rx="3.98" ry="4" fill="white" />
                <ellipse cx="134.42" cy="211" rx="3.98" ry="4" fill="white" />
                <ellipse cx="3.98" cy="360" rx="3.98" ry="4" fill="white" />
                <ellipse cx="486.89" cy="95" rx="3.98" ry="4" fill="white" />
                <ellipse cx="677.07" cy="47" rx="3.98" ry="4" fill="white" />
                <ellipse cx="1084.3" cy="299" rx="3.98" ry="4" fill="white" />
              </svg>
            </div>
          )} */}

          {/* Stars / Dots - show in both views */}
          <div style={{ position: view === 'core' ? 'absolute' : 'fixed', top: 0, left: 0, width: 1154, height: 364, zIndex: 2 }}>
            <svg width="1154" height="364" viewBox="0 0 1154 364" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="1150.02" cy="55" rx="3.98" ry="4" fill="white" />
              <ellipse cx="949.88" cy="19" rx="3.98" ry="4" fill="white" />
              <ellipse cx="203.12" cy="4" rx="3.98" ry="4" fill="white" />
              <ellipse cx="134.42" cy="211" rx="3.98" ry="4" fill="white" />
              <ellipse cx="3.98" cy="360" rx="3.98" ry="4" fill="white" />
              <ellipse cx="486.89" cy="95" rx="3.98" ry="4" fill="white" />
              <ellipse cx="677.07" cy="47" rx="3.98" ry="4" fill="white" />
              <ellipse cx="1084.3" cy="299" rx="3.98" ry="4" fill="white" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className={`${themeColors.textColor} font-press-start z-10 text-center mb-6`}
            style={{ fontSize: "clamp(1.5rem, 6vw, 4rem)" }}>
            Meet the Team
          </h1>



          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10 w-full max-w-5xl px-4 justify-center">
            {/* Core Button */}
            <button
              className={`relative w-full sm:w-[320px] h-[60px] sm:h-[81px] flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none transition-all duration-1000`}
              onClick={() => setView('core')}
              aria-pressed={view === 'core'}
              style={{ outline: 'none' }}
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'core' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'core' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span
                className="font-press-start text-[16px] sm:text-[24px] text-black z-10 leading-none flex items-center justify-center"
                style={{ lineHeight: "1", marginTop: "-16px" }}
              >
                CORE
              </span>
            </button>

            {/* Board Button */}
            <button
              className={`relative w-full sm:w-[320px] h-[60px] sm:h-[81px] flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none transition-all duration-1000`}
              onClick={() => setView('board')}
              aria-pressed={view === 'board'}
              style={{ outline: 'none' }}
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'board' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'board' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span
                className="font-press-start text-[16px] sm:text-[24px] text-black z-10 leading-none flex items-center justify-center"
                style={{ lineHeight: "1", marginTop: "-16px" }}
              >
                BOARD
              </span>
            </button>

            {/* Departments Button */}
            <button
              className={`relative w-full sm:w-[320px] h-[60px] sm:h-[81px] flex items-center justify-center border-none bg-transparent p-0 outline-none focus:outline-none focus-visible:outline-none transition-all duration-1000`}
              onClick={() => setView('departments')}
              aria-pressed={view === 'departments'}
              style={{ outline: 'none' }}
            >
              <img src="/images/button-gold.svg" className={`absolute inset-0 w-full h-full ${view === 'departments' ? 'opacity-100' : 'opacity-0'}`} alt="" />
              <img src="/images/button-peach.svg" className={`absolute inset-0 w-full h-full ${view === 'departments' ? 'opacity-0' : 'opacity-100'}`} alt="" />
              <span
                className="font-press-start text-[16px] sm:text-[24px] text-black z-10 leading-none flex items-center justify-center"
                style={{ lineHeight: "1", marginTop: "-16px" }}
              >
                DEPARTMENTS
              </span>
            </button>
          </div>

          {/* Core View */}
          {view === 'core' && (
            <div className="flex flex-wrap justify-center gap-8 w-full" style={{ transform: `scale(${rowScale})`, transformOrigin: 'top center' }}>
              <RedCard name="Samyak" title="Vice Chairperson" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKECJuszdeJaBN8xfuV7iYTPHK3QA0SXWp2tUhv" />
              <BlueCard name="Sudeep" title="Secretary" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKE5L8GfxEvK0cVWaoY4UbStprle19NBx8f3nZT" />
              <GreenCard name="Palak" title="Co-Secretary" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEISfnBwPc5JbMFG4smKfNiBZauQt6l8OLEyp3" />
            </div>
          )}

          {/* Board View */}
          {view === 'board' && (
            <div className="flex flex-col items-center space-y-8 relative z-10 w-full">
              <div className="flex justify-center flex-wrap gap-8 w-full max-w-7xl" style={{ transform: `scale(${rowScale})`, transformOrigin: 'top center' }}>
                <GreenCard name="Ram" title="Management Sec" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEvmEGLHhWmy6tpuiexQX81z0fGaEJbT52MDPl" />
                <YellowCard name="Gouse Moideen" title="Technical Head" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEqo3zaDIInNK8kJlzwGpxeOijdSYC2VZAs1XP" />
                <RedCard name="Preeti B R" title="Creative Head" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKElsJLslUmuIWeFadG1QP8jwZAfYKCcb4pk30y" />
                <BlueCard name="Akanksha" title="Event Head" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEuNsZGPz4GRJyS3pjE8dT6PNtDZVeIqY7LOAF" />
                <GreenCard name="Ahmed Sajjad" title="Publicity Head" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKErsUjjionT9jgs5WpEKi34UvaDCyhSeY1McxP" />
                {/* @ts-ignore */}
                <YellowCard name="Tarang" title="Projects Head" imageSrc="https://cdn.phototourl.com/free/2026-06-29-0248d95d-c69c-4c1d-b09d-7db2424ed502.jpg" imagePosition="right center" />
              </div>
            </div>
          )}

          {/* Departments View */}
          {view === 'departments' && (
            <div className="flex flex-col items-center space-y-8 relative z-10 w-full">
              {/* Team Members Grid */}
              {rows.map((rowData, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-8" style={{ transform: `scale(${rowScale})`, transformOrigin: 'top center', marginBottom: `${(rowScale - 1) * 279}px` }}>
                  {rowData.map((data, index) => {
                    const CardComponent = cardOrder[index % cardOrder.length] as any;
                    return (
                      <CardComponent
                        key={index}
                        name={data.name}
                        title={data.title}
                        imageSrc={data.imageSrc}
                        imagePosition={data.imagePosition}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetTheBoardPage;