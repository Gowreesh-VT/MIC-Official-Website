'use client';

import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import PixelCard from './components/PixelCard';

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
  index
}: {
  position: { top: string | number; left: string | number };
  src: string;
  index: number;
}) => (
  <Image
    src={src}
    alt={`Cloud ${index + 1}`}
    width={277}
    height={224}
    style={{
      position: 'absolute',
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
  ];

  const cloudImages = useMemo(() => [
    '/images/retro_cloud.svg', '/images/retro_cloud.svg', '/images/retro_cloud.svg',
    '/images/retro_cloud.svg', '/images/retro_cloud.svg', '/images/retro_cloud.svg',
    '/images/retro_cloud.svg'
  ], []);

  useEffect(() => {
    // Enable scroll styling
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.25);
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.4);
      }
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.25) transparent;
      }
    `;
    document.head.appendChild(style);

    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    // Allow scrolling in all views for better mobile/smaller screen support
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflowY = 'auto';

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

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
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventKeyboardZoom);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.head.removeChild(style);
    };
  }, []);

  // Filter leads data by selected tenure
  const filteredLeadsData = leadsData.filter(lead => lead.tenure === selectedTenure);

  // Responsive cards per row & scale
  const cardsPerRow = windowWidth < 640 ? 1 : windowWidth < 1100 ? 2 : 4;
  const CARD_W = 323;
  const CARD_GAP = 32;
  const rowTotalW = cardsPerRow * CARD_W + (cardsPerRow - 1) * CARD_GAP;
  const availableW = windowWidth - 32;
  const rowScale = rowTotalW > availableW ? Math.max(0.5, availableW / rowTotalW) : 1;

  // Prepare rows for departments view
  const rows: typeof filteredLeadsData[] = [];
  for (let i = 0; i < filteredLeadsData.length; i += cardsPerRow) {
    rows.push(filteredLeadsData.slice(i, i + cardsPerRow));
  }

  return (
    <div 
      className="h-screen w-full relative flex flex-col items-center select-none overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1188EE 0%, #0E8AEA 24.52%, #1093EB 35.07%, #1197EC 45.67%, #16B6F4 52.35%, #10CBF1 56.04%, #0FC6F1 59.73%, #15DEF0 64.76%, #15DEF0 81.25%)',
      }}
    >
      {/* Floating Clouds */}
      {cloudPositions.map((pos, i) => (
        <Cloud
          key={i}
          position={pos}
          src={cloudImages[i]}
          index={i}
        />
      ))}

      {/* Red Close Button */}
      <Link href="/main" className="absolute top-6 right-6 z-50 hover:scale-105 transition-transform duration-200">
        <img src="/close_button.svg" alt="Close" className="w-[35px] h-[33px] md:w-[53px] md:h-[50px]" style={{ imageRendering: 'pixelated' }} />
      </Link>

      {/* Title */}
      <h1 className="text-black font-press-start z-10 text-center mb-6 mt-6 flex-shrink-0"
        style={{ 
          fontSize: "clamp(1.5rem, 6vw, 3.5rem)",
          textShadow: "4px 4px 0 rgba(255, 255, 255, 0.4)",
        }}>
        Meet the Team
      </h1>

      {/* Navigation Buttons (BOARD / CABINET / DEPARTMENTS) */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8 relative z-10 w-full max-w-5xl px-4 justify-center items-center flex-shrink-0">
        {/* BOARD Button Container */}
        <div className="relative flex items-center w-full sm:w-auto">
          <button
            onClick={() => setView('core')}
            className={`font-press-start text-[14px] sm:text-[18px] w-full sm:w-[220px] py-4 rounded-[8px] border-4 border-black text-black font-bold uppercase transition-all duration-100 flex items-center justify-center outline-none focus:outline-none`}
            style={{
              background: view === 'core' ? '#A1E51C' : '#73C500',
              transform: view === 'core' ? 'translateY(4px)' : 'translateY(0px)',
              boxShadow: view === 'core' ? 'none' : '0 6px 0 0 #101010',
            }}
          >
            BOARD
          </button>
        </div>

        {/* CABINET Button Container */}
        <div className="relative flex items-center w-full sm:w-auto">
          <button
            onClick={() => setView('board')}
            className={`font-press-start text-[14px] sm:text-[18px] w-full sm:w-[220px] py-4 rounded-[8px] border-4 border-black text-black font-bold uppercase transition-all duration-100 flex items-center justify-center outline-none focus:outline-none`}
            style={{
              background: view === 'board' ? '#A1E51C' : '#73C500',
              transform: view === 'board' ? 'translateY(4px)' : 'translateY(0px)',
              boxShadow: view === 'board' ? 'none' : '0 6px 0 0 #101010',
            }}
          >
            CABINET
          </button>
        </div>

        {/* DEPARTMENTS Button Container */}
        <div className="relative flex items-center w-full sm:w-auto">
          <button
            onClick={() => setView('departments')}
            className={`font-press-start text-[14px] sm:text-[18px] w-full sm:w-[220px] py-4 rounded-[8px] border-4 border-black text-black font-bold uppercase transition-all duration-100 flex items-center justify-center outline-none focus:outline-none`}
            style={{
              background: view === 'departments' ? '#A1E51C' : '#73C500',
              transform: view === 'departments' ? 'translateY(4px)' : 'translateY(0px)',
              boxShadow: view === 'departments' ? 'none' : '0 6px 0 0 #101010',
            }}
          >
            DEPARTMENTS
          </button>
          <motion.div
            className="absolute left-[105%] pointer-events-none select-none z-20 hidden md:block"
            style={{ width: 44, height: 35 }}
            animate={{ y: [-4, 4, -4] }}
            transition={{
              y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            <img src="/pixel_bird.svg" alt="flappy bird" className="w-full h-full object-contain" />
          </motion.div>
        </div>
      </div>

      {/* Scrollable Cards Area */}
      <div className="flex-1 w-full overflow-y-auto min-h-0 flex flex-col items-center px-4 pt-2 pb-[240px] z-10 scrollbar-custom">
        {/* BOARD view (core leads) */}
        {view === 'core' && (
          <div className="flex flex-wrap justify-center gap-8 w-full" style={{ transform: `scale(${rowScale})`, transformOrigin: 'top center' }}>
            <PixelCard name="Samyak" title="Vice Chairperson" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKECJuszdeJaBN8xfuV7iYTPHK3QA0SXWp2tUhv" />
            <PixelCard name="Sudeep" title="Secretary" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKE5L8GfxEvK0cVWaoY4UbStprle19NBx8f3nZT" />
            <PixelCard name="Palak" title="Co-Secretary" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEISfnBwPc5JbMFG4smKfNiBZauQt6l8OLEyp3" />
          </div>
        )}

        {/* CABINET view (board heads) */}
        {view === 'board' && (
          <div className="flex flex-col items-center space-y-8 w-full">
            <div className="flex justify-center flex-wrap gap-8 w-full max-w-7xl" style={{ transform: `scale(${rowScale})`, transformOrigin: 'top center' }}>
              <PixelCard name="Ram" title="Management Sec" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEvmEGLHhWmy6tpuiexQX81z0fGaEJbT52MDPl" />
              <PixelCard name="Gouse Moideen" title="Technical Head" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEqo3zaDIInNK8kJlzwGpxeOijdSYC2VZAs1XP" />
              <PixelCard name="Preeti B R" title="Creative Head" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKElsJLslUmuIWeFadG1QP8jwZAfYKCcb4pk30y" />
              <PixelCard name="Akanksha" title="Event Head" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKEuNsZGPz4GRJyS3pjE8dT6PNtDZVeIqY7LOAF" />
              <PixelCard name="Ahmed Sajjad" title="Publicity Head" imageSrc="https://h8z6stjynz.ufs.sh/f/nEev6VX4XfKErsUjjionT9jgs5WpEKi34UvaDCyhSeY1McxP" />
              <PixelCard name="Tarang" title="Projects Head" imageSrc="https://cdn.phototourl.com/free/2026-06-29-0248d95d-c69c-4c1d-b09d-7db2424ed502.jpg" imagePosition="right center" />
            </div>
          </div>
        )}

        {/* DEPARTMENTS view */}
        {view === 'departments' && (
          <div className="flex flex-col items-center space-y-8 w-full">
            {rows.map((rowData, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-8" style={{ transform: `scale(${rowScale})`, transformOrigin: 'top center', marginBottom: `${(rowScale - 1) * 211}px` }}>
                {rowData.map((data, index) => {
                  return (
                    <PixelCard
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

      {/* Background Layers matching Landing Page */}
      {/* Cityscape Backdrop */}
      <div 
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{ 
          bottom: "72px", 
          height: "28vh", 
          backgroundImage: "url('/cityscape.svg')", 
          backgroundRepeat: "repeat-x", 
          backgroundPosition: "bottom", 
          backgroundSize: "auto 100%", 
          zIndex: 1 
        }} 
      />

      {/* Bushes Backdrop */}
      <div 
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: "62px",           
          height: "16vh",
          backgroundImage: "url('/pixel_bushes.svg')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "auto 100%",
          zIndex: 2,
        }} 
      />

      {/* Scrolling Ground Ticker */}
      <div 
        className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
        style={{ 
          height: "72px", 
          background: "#CC9339", 
          borderTop: "8px solid #589B00", 
          zIndex: 10 
        }}
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

export default MeetTheBoardPage;