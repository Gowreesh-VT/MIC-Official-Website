'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CloudFloatOptions {
  baseTopVh: number;
  baseLeftVw: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

interface Project {
  id: number;
  title: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  description: string;
  techStack: string[];
  codeUrl?: string;
  demoUrl?: string;
  previewImage?: string;
  ballImage: string;
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
      setOffset(Math.sin((frameRef.current / 60) * speed + phase) * amplitude);
      if (running) {
        requestAnimationFrame(animate);
      }
    };
    animate();

    return () => {
      running = false;
    };
  }, [amplitude, speed, phase]);

  return {
    top: `calc(${baseTopVh}vh + ${offset}px)`,
    left: `${baseLeftVw}vw`,
  };
}

const CLOUD_CONFIGS = [
  {
    src: '/images/cloud1.png',
    w: 270,
    h: 174,
    floatOpts: { baseTopVh: 4, baseLeftVw: 1, amplitude: 8, speed: 0.4, phase: 0 },
  },
  {
    src: '/images/cloud2.png',
    w: 320,
    h: 192,
    floatOpts: { baseTopVh: 19, baseLeftVw: 4, amplitude: 12, speed: 0.5, phase: 1.5 },
  },
  {
    src: '/images/cloud1.png',
    w: 250,
    h: 160,
    floatOpts: { baseTopVh: 5, baseLeftVw: 66, amplitude: 8, speed: 0.35, phase: 3 },
  },
  {
    src: '/images/cloud2.png',
    w: 300,
    h: 180,
    floatOpts: { baseTopVh: 21, baseLeftVw: 74, amplitude: 10, speed: 0.45, phase: 4.5 },
  },
] as const;

function FloatingCloud({ src, w, h, floatOpts }: (typeof CLOUD_CONFIGS)[number]) {
  const pos = useCloudFloat(floatOpts);

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ top: pos.top, left: pos.left, zIndex: 6 }}
    >
      <Image src={src} alt="Cloud" width={w} height={h} priority style={{ height: 'auto' }} />
    </div>
  );
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI Academic Assistant',
    status: 'Pending',
    description:
      "AI Academic Assistant converts syllabus, notes, and past papers into a personalized exam strategy with predicted topic weightage and targeted revision.",
    techStack: ['Python', 'FastAPI', 'OpenAI', 'Next.js', 'TypeScript'],
    codeUrl: 'https://github.com/micvitc/acad-assistant',
    demoUrl: 'https://drive.google.com/file/d/1p9uNLFISlp8mbNnNjeEWquToglu_Vn-A/view?usp=sharing',
    previewImage: '/project/AI_Academic_Assistant_Combined.png',
    ballImage: '/images/projects_page_new/Pokeball (1).png',
  },
  {
    id: 2,
    title: 'Autonomous Vision Warehouse Rover',
    status: 'Pending',
    description:
      'A low-cost AI rover for warehouses that fuses vision and depth data to detect obstacles and navigate indoors in real time.',
    techStack: ['Python', 'C++', 'OpenCV', 'ROS 2', 'PyTorch'],
    codeUrl: 'https://github.com/Vision-based-Rover/Autonomous-Rover',
    previewImage: '/images/imageno2.png',
    ballImage: '/images/projects_page_new/Pokeball (2).png',
  },
  {
    id: 3,
    title: 'TASA CodeCraft',
    status: 'Pending',
    description:
      'A guided placement preparation system covering DSA, system design, aptitude, and core CS with adaptive progress tracking.',
    techStack: ['Java', 'Spring Boot', 'React', 'MySQL', 'Redis'],
    codeUrl: 'https://github.com/TASA-Code-Craft/frontend',
    demoUrl: 'https://drive.google.com/file/d/1G1erMBSeZ0qpF-bgSSPyXWx0wLnjMlpq/view?usp=sharing',
    previewImage: '/project/TASA_CodeCraft.png',
    ballImage: '/images/projects_page_new/Pokeball (3).png',
  },
  {
    id: 4,
    title: 'Project Slot 04',
    status: 'In Progress',
    description: 'Upcoming project showcase slot for the current tenure.',
    techStack: ['Coming Soon'],
    ballImage: '/images/projects_page_new/Pokeball (4).png',
  },
  {
    id: 5,
    title: 'Project Slot 05',
    status: 'In Progress',
    description: 'Upcoming project showcase slot for the current tenure.',
    techStack: ['Coming Soon'],
    ballImage: '/images/projects_page_new/Pokeball (5).png',
  },
  {
    id: 6,
    title: 'Project Slot 06',
    status: 'Pending',
    description: 'Upcoming project showcase slot for the current tenure.',
    techStack: ['Coming Soon'],
    ballImage: '/images/projects_page_new/Pokeball (6).png',
  },
];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [animatingProjectId, setAnimatingProjectId] = useState<number | null>(null);

  const handleProjectClick = (project: Project) => {
    if (animatingProjectId !== null) return;
    setAnimatingProjectId(project.id);
    setTimeout(() => {
      setSelectedProject(project);
      setAnimatingProjectId(null);
    }, 700);
  };

  const nextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIdx = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIdx]);
  };

  const prevProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIdx]);
  };

  return (
    <div
      className="w-full h-screen relative overflow-hidden select-none"
      style={{
        background:
          'linear-gradient(180deg,#1188EE 0%,#0E8AEA 24.52%,#1093EB 35.07%,#1197EC 45.67%,#16B6F4 52.35%,#10CBF1 56.04%,#0FC6F1 59.73%,#15DEF0 64.76%,#15DEF0 81.25%)',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          opacity: 0.08,
          backgroundImage:
            'linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,1) 1px,transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {CLOUD_CONFIGS.map((cfg, i) => (
        <FloatingCloud key={i} {...cfg} />
      ))}

      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: '72px',
          height: '40vh',
          backgroundImage: "url('/big_cloud.svg')",
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%',
          zIndex: 2,
        }}
      />

      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: '72px',
          height: '28vh',
          backgroundImage: "url('/cityscape.svg')",
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%',
          zIndex: 3,
        }}
      />

      <div
        className="absolute left-0 right-0 pointer-events-none select-none"
        style={{
          bottom: '62px',
          height: '16vh',
          backgroundImage: "url('/pixel_bushes.svg')",
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'bottom',
          backgroundSize: 'auto 100%',
          zIndex: 4,
        }}
      />

      {/* Top Left Logo (Visible in both states) */}
      <div className="absolute left-4 top-4 z-40 pointer-events-auto">
        <Image
          src="/mic_logo_pixel.svg"
          alt="MIC Logo"
          width={56}
          height={56}
          className="h-auto w-12 md:w-16 object-contain cursor-pointer"
          priority
        />
      </div>

      {/* Dynamic Top-Right Close Button */}
      {selectedProject ? (
        <button
          onClick={() => setSelectedProject(null)}
          className="absolute right-4 top-4 z-40 flex h-12 w-12 items-center justify-center border-4 border-black bg-[#ff4b4b] text-black font-press-start text-xl leading-none hover:brightness-95 active:scale-95 transition-transform"
          aria-label="Close project details"
          type="button"
        >
          X
        </button>
      ) : (
        <Link
          href="/main"
          className="absolute right-4 top-4 z-40 flex h-12 w-12 items-center justify-center border-4 border-black bg-[#ff4b4b] text-black font-press-start text-xl leading-none hover:brightness-95 active:scale-95 transition-transform"
          aria-label="Close and return to home"
        >
          X
        </Link>
      )}

      {/* Closed State Only Elements */}
      {!selectedProject && (
        <>
          {/* Pikachu Sprite with Bobbing */}
          <motion.div
            className="absolute left-[6vw] bottom-[15vh] md:bottom-[22vh] z-30 w-16 md:w-24 pointer-events-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/25.png"
              alt="Pikachu"
              className="w-full h-auto object-contain animate-bobbing"
              style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}
            />
          </motion.div>

          {/* Wigglytuff Sprite */}
          <div className="absolute right-[6vw] bottom-[9vh] md:bottom-[11vh] z-30 w-16 md:w-24 pointer-events-none">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/40.png"
              alt="Wigglytuff"
              className="w-full h-auto object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* Pidgeot Sprite */}
          <motion.div
            className="absolute right-[22vw] top-[14vh] z-20 w-16 md:w-24 pointer-events-none"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/pixel_bird.svg"
              alt="Pidgeot"
              className="w-full h-auto object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </>
      )}

      {/* Open State Only Elements */}
      {selectedProject && (
        <>
          {/* Flappy Bird Sprite */}
          <motion.div
            className="absolute right-[10vw] top-[14vh] z-20 w-12 md:w-16 pointer-events-none"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/images/bird.png"
              alt="Flappy Bird"
              className="w-full h-auto object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </>
      )}

      {/* Closed State Grid View */}
      {!selectedProject && (
        <main
          className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4"
          style={{ zIndex: 20, height: 'calc(100vh - 72px)', paddingTop: '70px', paddingBottom: '16px' }}
        >
          <h1
            className="font-press-start text-black select-none pointer-events-none"
            style={{
              fontSize: 'clamp(1.3rem, 4.2vw, 2.8rem)',
              textShadow: '2px 2px 0 rgba(255,255,255,0.5)',
            }}
          >
            Projects
          </h1>

          <div
            className="mt-6 grid w-full grid-cols-2 gap-2 md:grid-cols-3 md:gap-5"
            style={{ maxWidth: '760px' }}
          >
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="group relative mx-auto w-full max-w-[176px] transition-transform duration-150 hover:scale-[1.04] active:scale-[0.98]"
                type="button"
                aria-label={`Open ${project.title}`}
              >
                <div className="relative mx-auto aspect-[1/1.02] w-full">
                  {/* Pokeball Image with Framer Motion Shake Animation */}
                  <motion.div
                    className="absolute left-1/2 top-[5%] w-[88%] h-auto -translate-x-1/2 origin-bottom"
                    animate={
                      animatingProjectId === project.id
                        ? {
                            rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                            y: [0, -4, 2, -2, 1, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                    }}
                  >
                    <Image
                      src={project.ballImage}
                      alt={project.title}
                      width={150}
                      height={124}
                      className="w-full h-auto"
                      priority
                    />
                  </motion.div>

                  {/* Release Flash Pulse */}
                  <AnimatePresence>
                    {animatingProjectId === project.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0.95 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[100]"
                        style={{
                          width: 150,
                          height: 150,
                          background:
                            'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(142,214,255,0.95) 45%, rgba(255,255,255,0) 70%)',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <Image
                    src="/images/projects_page_new/Podium.png"
                    alt="Pokeball base"
                    width={160}
                    height={56}
                    className="absolute bottom-[4%] left-1/2 w-[86%] h-auto -translate-x-1/2"
                    priority
                  />
                </div>
                <span
                  className="absolute left-1/2 bottom-[14%] -translate-x-1/2 whitespace-nowrap bg-black/65 px-2 py-1 font-press-start text-[7px] text-white md:text-[8px]"
                >
                  {project.title}
                </span>
              </button>
            ))}
          </div>
        </main>
      )}

      {/* Open State Modal View with Event Pass-Through (pointer-events-none) */}
      {selectedProject && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none"
          style={{ paddingTop: '80px', paddingBottom: '80px' }}
        >
          {/* Main Frame Container - pointer-events-auto lets interactive elements work */}
          <div className="relative w-full max-w-[700px] bg-[#FFEFE5] border-[6px] border-black rounded-[36px] p-3 md:p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.15)] flex flex-col pointer-events-auto">
            
            {/* Open Pokeball (Top-Left corner) */}
            <div className="absolute -left-9 -top-9 w-24 h-24 md:w-28 md:h-28 z-30 pointer-events-none select-none">
              <Image
                src="/images/projects_page_new/project_opened/pokeball-open.svg"
                alt="Open Pokeball"
                width={112}
                height={112}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Wartortle Sprite (Bottom-Right corner) */}
            <div className="absolute -right-8 -bottom-7 w-28 h-28 md:w-36 md:h-36 z-30 pointer-events-none select-none">
              <Image
                src="/images/projects_page_new/project_opened/Wartortle.svg"
                alt="Wartortle"
                width={144}
                height={144}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Left Navigation Arrow */}
            <button
              onClick={prevProject}
              className="absolute left-2 md:-left-20 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 md:h-14 md:w-14 items-center justify-center border-4 border-black bg-[#CCCCCC] rounded-full hover:bg-[#BBBBBB] active:scale-95 transition-transform"
              aria-label="Previous project"
              type="button"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
                <polygon points="16,6 8,12 16,18" fill="#555555" />
              </svg>
            </button>
            
            {/* Right Navigation Arrow */}
            <button
              onClick={nextProject}
              className="absolute right-2 md:-right-20 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 md:h-14 md:w-14 items-center justify-center border-4 border-black bg-[#CCCCCC] rounded-full hover:bg-[#BBBBBB] active:scale-95 transition-transform"
              aria-label="Next project"
              type="button"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none">
                <polygon points="8,6 16,12 8,18" fill="#555555" />
              </svg>
            </button>

            {/* Orange/Brown Title Bar */}
            <div className="mx-auto -mt-2 md:-mt-3 mb-3 bg-[#CC5229] border-4 border-black rounded-full px-6 py-1.5 md:py-2 max-w-[85%] text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
              <span className="font-press-start text-[9px] md:text-xs text-black uppercase tracking-wider block whitespace-nowrap overflow-hidden text-ellipsis">
                {selectedProject.title}
              </span>
            </div>

            {/* Inner White Body Card */}
            <div className="relative bg-white border-4 border-black rounded-2xl p-4 md:p-6 flex-1 min-h-[280px] md:min-h-[320px] flex flex-col justify-between">
              
              <div className="grid gap-5 md:grid-cols-[1.3fr_1fr] flex-1 overflow-y-auto px-6 md:px-0 pb-1">
                {/* Details (Left Side) */}
                <div className="flex flex-col justify-start">
                  <h2 className="font-press-start text-black text-xs md:text-sm tracking-wide leading-tight">
                    {selectedProject.title}
                  </h2>
                  
                  {/* Status */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="font-press-start text-[7px] md:text-[8px] text-black/50">STATUS:</span>
                    <span className={`border-2 border-black px-2 py-0.5 font-press-start text-[6px] md:text-[7px] text-black ${
                      selectedProject.status === 'Completed' ? 'bg-[#4ade80]' :
                      selectedProject.status === 'In Progress' ? 'bg-[#facc15]' :
                      'bg-[#fb923c]'
                    }`}>
                      {selectedProject.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 font-mono text-[11px] md:text-[12.5px] leading-relaxed text-black/80 max-h-[120px] md:max-h-[140px] overflow-y-auto pr-1">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mt-3 flex flex-wrap gap-1 md:gap-1.5">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="border-2 border-black bg-gray-100 px-1.5 py-0.5 font-press-start text-[6px] md:text-[7px] text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preview Image (Right Side) */}
                <div className="relative min-h-[140px] md:min-h-full border-4 border-black rounded-lg bg-gray-50 overflow-hidden flex items-center justify-center">
                  {selectedProject.previewImage ? (
                    <Image
                      src={selectedProject.previewImage}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  ) : (
                    <div className="p-4 text-center font-press-start text-[8px] md:text-[9px] text-gray-400 leading-normal">
                      Preview coming soon
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-3 px-6 md:px-0">
                {selectedProject.codeUrl && (
                  <Link
                    href={selectedProject.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-4 border-black bg-[#0e8aea] px-4 py-2 font-press-start text-[8px] md:text-[9px] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
                  >
                    VIEW CODE
                  </Link>
                )}
                {selectedProject.demoUrl && (
                  <Link
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-4 border-black bg-[#f5c14f] px-4 py-2 font-press-start text-[8px] md:text-[9px] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
                  >
                    VIEW DEMO
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Footer Ground Marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
        style={{ height: '72px', background: '#CC9339', borderTop: '8px solid #589B00', zIndex: 40 }}
      >
        <div className="relative flex w-full overflow-x-hidden pointer-events-none">
          <div
            className="animate-marquee whitespace-nowrap flex uppercase tracking-widest font-press-start"
            style={{ color: '#5E3A00', fontSize: 'clamp(10px,1.3vw,14px)' }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="mx-8">
                MICROSOFT INNOVATIONS CLUB TENURE 2026-2027
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
