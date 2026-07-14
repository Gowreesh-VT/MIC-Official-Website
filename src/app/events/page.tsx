"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const events = [
	{
		title: "Only Founders",
		desc: "A 48-hour startup sprint where teams of 6 build their first digital startup across five high-impact tech domains — competing across 15 colleges.",
		details: "Only Founders was a multi-college 48-hour startup-building hackathon where teams of 6 were challenged to ideate, build, and pitch a functional digital product within a single sprint. Spanning five domains — FinTech & Digital Payments, AI Automation & Digital Media, Gaming & Entertainment Tech, Digital Health & Wellness Tech, and EdTech & Learning Automation — the event brought together participants from 15 colleges for one grand final at VIT Chennai. Teams had to go beyond pitching and actually build, making it a true test of technical execution, product thinking, and startup mindset.",
		bg: "bg-[#FFF8E7]",
		border: "border-[#F5C842]",
		text: "text-[#5C3D00]",
		borderColor: "#F5C842",
		startDate: new Date("2026-02-05"),
		endDate: new Date("2026-02-06"),
	},
	{
		title: "HACKATHRONE",
		desc: "A 24-hour hackathon challenging teams to engineer innovative solutions under time pressure.",
		details: "HACKATHRONE was a high-intensity 24-hour hackathon that pushed participants to ideate, prototype, and deliver full-stack solutions within a strict time limit. Teams tackled real-world problem statements spanning domains like AI and ML, Web development, Cybersecurity or web3, and Innovation. The format demanded rapid iteration, technical depth, and collaborative engineering — rewarding those who could balance creativity with execution under pressure.",
		bg: "bg-[#E8F0FF]",
		border: "border-[#93B4FF]",
		text: "text-[#0A1F6B]",
		borderColor: "#93B4FF",
		startDate: new Date("2025-10-29"),
		endDate: new Date("2025-10-30"),
	},
	{
		title: "DataSprint Hackathon",
		desc: "A two-level 24-hour hackathon driven by innovation in Generative AI, HealthTech, and FinTech.",
		details: "DataSprint was a two-level hackathon that challenged teams of 3–5 to build high-impact solutions across domains like Generative AI, HealthTech, and FinTech. Level 1 served as a qualifying round, with shortlisted teams advancing to the intense 24-hour Level 2 finals. Participants worked through overnight assessments, domain-focused challenges, and rigorous evaluation rounds judged on innovation, technical execution, feasibility, impact, and presentation quality — with a prize pool of INR 50,000 at stake.",
		bg: "bg-[#E8FFE8]",
		border: "border-[#7AE89A]",
		text: "text-[#064D1E]",
		borderColor: "#7AE89A",
		startDate: new Date("2025-09-04"),
		endDate: new Date("2025-09-05"),
	},
	{
		title: "REMICS",
		desc: "MIC's 5-year celebration and orientation event — revealing big initiatives, sharing the club's vision, and opening doors for the next generation of innovators.",
		details: "REMICS marked five years of the Microsoft Innovation Club at VIT Chennai — an orientation and celebration event that brought students face-to-face with the club's vision, roadmap, and community. Club leads took the stage to share future visions and what's next, followed by recruitment insights guiding students toward joining M.I.C. The event featured fun & interactive segments for students to connect, express, and play, alongside major big reveals that had been months in the making. MIC unveiled its official website, walkthrough of its structured project cycle, and opportunities like the Microsoft Learn Student Ambassador Program.",
		bg: "bg-[#F3EEFF]",
		border: "border-[#C084FC]",
		text: "text-[#3B0764]",
		borderColor: "#C084FC",
		startDate: new Date("2025-09-08"),
		endDate: new Date("2025-09-08"),
	},
	{
		title: "HEATCODE",
		desc: "A full-day competitive programming challenge where teams battle through two gruelling rounds to claim the top spot.",
		details: "HEATCODE was a high-stakes competitive programming contest built for teams of 2–4 that ran across two back-to-back elimination rounds. Participants tackled a gauntlet of algorithmic problems spanning greedy strategies, dynamic programming, graph theory, and number theory — under a strict time limit with an attractive prize pool on the line. The dual-round format separated the sharp from the elite, demanding both raw coding speed and sharp problem-solving strategy.",
		bg: "bg-[#FFE8E8]",
		border: "border-[#FF9494]",
		text: "text-[#6B0000]",
		borderColor: "#FF9494",
		startDate: new Date("2026-01-09"),
		endDate: new Date("2026-01-09"),
	},
	{
		title: "CODE CITADEL",
		desc: "A 4-round web development gauntlet — from HTML fundamentals to live deployment — where every round brought participants closer to conquering the web.",
		details: "CODE CITADEL was a progressive 4-round web development competition that took participants from the ground up. Round 1 (HTML Conquest) tested markup fundamentals with a quiz and static webpage build. Round 2 (CSS Clash) challenged teams to pixel-perfectly style an HTML page using only CSS. Round 3 (JavaScript + Git Gauntlet) combined a JS logic quiz, rapid-fire questions, and a Git branching challenge. Round 4 (The Final Siege) was the ultimate test — clone a real-world website like Spotify or GitHub using React.js or Next.js and deploy it live online.",
		bg: "bg-[#FFF0E8]",
		border: "border-[#FFBB94]",
		text: "text-[#6B2500]",
		borderColor: "#FFBB94",
		startDate: new Date("2025-10-27"),
		endDate: new Date("2025-10-27"),
	},
];

// Helper function to format date
const formatEventDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Helper function to check if event is upcoming
const isUpcoming = (date: Date): boolean => {
	const now = new Date();
	now.setHours(0, 0, 0, 0);
	return date >= now;
};

/* ─── Floating cloud hook ──────────────────────────────────────────────── */
interface CloudFloatOptions {
  baseTopVh: number;
  baseLeftVw: number;
  amplitude?: number;
  speed?: number;
  phase?: number;
}

function useCloudFloat({
  baseTopVh, baseLeftVw, amplitude = 10, speed = 0.4, phase = 0,
}: CloudFloatOptions) {
  const [offset, setOffset] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    let running = true;
    const animate = () => {
      frameRef.current += 1;
      setOffset(Math.sin((frameRef.current / 60) * speed + phase) * amplitude);
      if (running) requestAnimationFrame(animate);
    };
    animate();
    return () => { running = false; };
  }, [amplitude, speed, phase]);

  return {
    top: `calc(${baseTopVh}vh + ${offset}px)`,
    left: `${baseLeftVw}vw`,
  };
}

/* ─── Cloud configs (2 left, 2 right, upper sky only) ─────────────────── */
const CLOUD_CONFIGS = [
  { src: "/images/cloud1.png", w: 270, h: 174, floatOpts: { baseTopVh: 4,  baseLeftVw: 1,  amplitude: 8,  speed: 0.4,  phase: 0   } },
  { src: "/images/cloud2.png", w: 320, h: 192, floatOpts: { baseTopVh: 19, baseLeftVw: 4,  amplitude: 12, speed: 0.5,  phase: 1.5 } },
  { src: "/images/cloud1.png", w: 250, h: 160, floatOpts: { baseTopVh: 5,  baseLeftVw: 66, amplitude: 8,  speed: 0.35, phase: 3   } },
  { src: "/images/cloud2.png", w: 300, h: 180, floatOpts: { baseTopVh: 21, baseLeftVw: 74, amplitude: 10, speed: 0.45, phase: 4.5 } },
] as const;

function FloatingCloud({ src, w, h, floatOpts }: (typeof CLOUD_CONFIGS)[number]) {
  const pos = useCloudFloat(floatOpts);
  return (
    <div className="absolute pointer-events-none select-none" style={{ top: pos.top, left: pos.left, zIndex: 6 }}>
      <Image src={src} alt="Cloud" width={w} height={h} priority style={{ height: "auto" }} />
    </div>
  );
}

const EventsPage = () => {
	const [openCard, setOpenCard] = useState<number | null>(null);

	// Lock body scroll when modal is open
	useEffect(() => {
		if (openCard !== null) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [openCard]);

	return (
		<div
			className="relative w-full h-screen overflow-hidden flex flex-col items-center select-none"
			style={{
				background: "linear-gradient(180deg, #1188EE 0%, #0E8AEA 24.52%, #1093EB 35.07%, #1197EC 45.67%, #16B6F4 52.35%, #10CBF1 56.04%, #0FC6F1 59.73%, #15DEF0 64.76%, #15DEF0 81.25%)",
			}}
		>
			{/* ─── Faint grid overlay ────────────────────────────────────────── */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					zIndex: 0,
					opacity: 0.08,
					backgroundImage:
						"linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,1) 1px,transparent 1px)",
					backgroundSize: "30px 30px",
				}}
			/>

			{/* Floating small clouds (matches home page) */}
			{CLOUD_CONFIGS.map((cfg, i) => <FloatingCloud key={i} {...cfg} />)}

			{/* ─── FIXED BACKDROP LAYERS (Matching Landing / Main Page) ─────── */}
			{/* Clouds backdrop */}
			<div
				className="fixed left-0 right-0 pointer-events-none select-none"
				style={{
					bottom: "72px",
					height: "40vh",
					backgroundImage: "url('/big_cloud.svg')",
					backgroundRepeat: "repeat-x",
					backgroundPosition: "bottom",
					backgroundSize: "auto 100%",
					zIndex: 2,
				}}
			/>

			{/* Bushes backdrop */}
			<div
				className="fixed left-0 right-0 pointer-events-none select-none"
				style={{
					bottom: "70px",
					height: "16vh",
					backgroundImage: "url('/pixel_bushes.svg')",
					backgroundRepeat: "repeat-x",
					backgroundPosition: "bottom",
					backgroundSize: "auto 100%",
					backgroundColor: "#589B00",
					zIndex: 4,
				}}
			/>

			{/* Ground Ticker */}
			<div
				className="fixed bottom-0 left-0 right-0 flex items-center overflow-hidden"
				style={{
					height: "72px",
					background: "#CC9339",
					borderTop: "8px solid #589B00",
					zIndex: 40,
				}}
			>
				<div className="relative flex overflow-x-hidden w-full pointer-events-none">
					<div
						className="animate-marquee whitespace-nowrap flex uppercase tracking-widest font-press-start"
						style={{ color: "#5E3A00", fontSize: "clamp(10px,1.3vw,14px)" }}
					>
						{Array.from({ length: 10 }).map((_, i) => (
							<span key={i} className="mx-8">
								MICROSOFT INNOVATIONS CLUB TENURE 2026-2027
							</span>
						))}
					</div>
				</div>
			</div>

			{/* ─── PAGE CONTENT (Viewport-locked wrapper, flex layout) ─────── */}
			<div className="relative w-full h-full z-10 flex flex-col items-center pt-24 pb-28 px-4 md:px-8 max-w-7xl mx-auto">
				
				{/* Top-left honeycomb logo is rendered globally by ConditionalNavbar */}

				{/* Center Sky: Bobbing Retro Bird */}
				<motion.div
					className="absolute pointer-events-none select-none hidden md:block"
					style={{ right: "12%", top: "20%", width: 56, height: 45, zIndex: 8 }}
					animate={{ y: [0, -14, 0] }}
					transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
				>
					<Image
						src="/pixel_bird.svg"
						alt="Pixel Bird"
						fill
						className="object-contain"
						style={{ imageRendering: "pixelated" }}
						priority
					/>
				</motion.div>

				{/* Top-Right: Close Button */}
				<Link
					href="/main"
					className="absolute top-6 right-6 md:right-12 z-50 flex items-center justify-center bg-[#E54A19] border-4 border-black hover:bg-red-700 transition-colors shadow-[4px_4px_0px_#000000] cursor-pointer hover:scale-105"
					style={{
						width: "clamp(38px, 4.5vw, 48px)",
						height: "clamp(38px, 4.5vw, 48px)",
						borderRadius: "0px",
					}}
				>
					<span className="font-press-start text-black text-xl font-bold" style={{ textShadow: "none" }}>X</span>
				</Link>

				{/* Title Heading — static events page title, no white shadow */}
				<h1
					className="font-press-start text-black text-center mb-10 tracking-wider select-none shrink-0"
					style={{
						fontSize: "clamp(2rem, 5vw, 3.5rem)",
					}}
				>
					Events
				</h1>

				{/* Scrollable Grid Container */}
				<div className="flex-1 w-full overflow-y-auto pr-2 custom-scrollbar" style={{ zIndex: 12 }}>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center w-full pb-8">
						{events.map((event, idx) => (
							<motion.div
								key={idx}
								className="flex flex-col bg-[#FFB59F] border-4 border-black rounded-[10px] p-[4px] cursor-pointer w-full max-w-[290px] h-[200px] select-none"
								whileHover={{ scale: 1.03, y: -4 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => setOpenCard(idx)}
							>
							{/* Card Header tab */}
							<div className="h-[36px] flex items-center justify-center bg-[#A93710] border-b-4 border-black rounded-t-[6px] rounded-b-[10px] w-full">
								<span className="font-press-start text-[11px] md:text-[12px] text-black font-bold uppercase tracking-wider">
									EVENT
								</span>
							</div>
							
							{/* Card Body Container */}
							<div className="flex-1 flex flex-col bg-[#FFDED6] rounded-b-[6px] rounded-t-[10px] p-[10px] mt-[4px]">
								{/* Inner white container */}
								<div className="flex-1 bg-white border-4 border-black rounded-[4px] flex flex-col justify-between p-3">
									<span className="font-press-start text-[9px] md:text-[10px] text-black leading-tight line-clamp-2 uppercase font-bold">
										{event.title}
									</span>
									
									{/* Date and Status Badge */}
									<div className="flex items-center justify-between mt-2 font-mono text-[10px] text-gray-700">
										<span className="flex items-center gap-1 font-semibold">
											📅 {formatEventDate(event.startDate)}
										</span>
										<span className={`px-1.5 py-0.5 rounded text-[8px] text-white font-bold uppercase ${
											isUpcoming(event.startDate) ? "bg-green-500" : "bg-gray-500"
										}`}>
											{isUpcoming(event.startDate) ? "Live" : "Past"}
										</span>
									</div>
								</div>
							</div>
						</motion.div>
					))}
					</div>
				</div>
			</div>

			{/* ─── MODAL OVERLAY (Details Window) ──────────────────────────── */}
			<AnimatePresence>
				{openCard !== null && (
					<motion.div
						className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
						style={{ backdropFilter: "blur(4px)" }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setOpenCard(null)}
					>
						<motion.div
							className="bg-[#FFB59F] border-4 border-black rounded-[12px] p-[6px] relative w-full max-w-[550px] shadow-2xl flex flex-col"
							initial={{ scale: 0.9, y: 20 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 20 }}
							onClick={(e) => e.stopPropagation()}
						>
							{/* Modal Header */}
							<div className="h-[44px] flex items-center justify-center bg-[#A93710] border-b-4 border-black rounded-t-[8px] rounded-b-[12px] w-full px-8">
								<span className="font-press-start text-[12px] md:text-[14px] text-white font-bold uppercase tracking-wider truncate">
									{events[openCard].title}
								</span>
							</div>

							{/* Modal Body container */}
							<div className="bg-[#FFDED6] rounded-b-[8px] rounded-t-[12px] p-4 mt-[6px] flex flex-col">
								{/* Inner content wrapper */}
								<div className="bg-white border-4 border-black rounded-[6px] p-5 text-black flex flex-col gap-4">
									
									{/* Event Details Status and Date */}
									<div className="flex items-center justify-between border-b-2 border-dashed border-gray-300 pb-3">
										<span className="font-mono text-xs text-gray-600 flex items-center gap-1.5">
											📅 {formatEventDate(events[openCard].startDate)}
										</span>
										<span className={`px-2 py-0.5 rounded text-[10px] text-white font-bold uppercase font-mono ${
											isUpcoming(events[openCard].startDate) ? "bg-green-500" : "bg-gray-500"
										}`}>
											{isUpcoming(events[openCard].startDate) ? "Upcoming Event" : "Past Event"}
										</span>
									</div>

									{/* Descriptions */}
									<div className="flex flex-col gap-3 font-mono text-sm leading-relaxed">
										<p className="font-semibold text-gray-800 border-l-4 border-[#A93710] pl-3 italic">
											{events[openCard].desc}
										</p>
										<p className="text-gray-700 text-xs md:text-sm">
											{events[openCard].details}
										</p>
									</div>

									{/* Close Action Button */}
									<button
										className="mt-2 py-2 px-4 bg-[#A93710] border-4 border-black text-white hover:bg-red-800 transition-colors uppercase font-press-start text-[10px] w-full rounded"
										onClick={() => setOpenCard(null)}
									>
										CLOSE WINDOW
									</button>
								</div>
							</div>

							{/* Close Button X */}
							<button
								className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 border-4 border-black text-white hover:bg-red-700 font-bold flex items-center justify-center text-sm shadow-md"
								onClick={() => setOpenCard(null)}
								style={{ imageRendering: "pixelated" }}
							>
								X
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default EventsPage;
