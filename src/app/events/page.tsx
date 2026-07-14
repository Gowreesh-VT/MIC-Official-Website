"use client";

import React, { useState, useEffect } from "react";
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

const EventsPage = () => {
	const [openCard, setOpenCard] = useState<number | null>(null);
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Detect system theme preference
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		setIsDarkMode(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) => {
			setIsDarkMode(e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

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

	// Theme-specific sky background gradient
	const getSkyBackground = () => {
		if (isDarkMode) {
			return "linear-gradient(180deg, #00040D 0%, #001229 24.52%, #001B3B 35.07%, #00224D 45.67%, #002E66 52.35%, #003B80 56.04%, #004799 59.73%, #005EBF 64.76%, #0077F2 81.25%)";
		}
		return "linear-gradient(180deg, #1188EE 0%, #0E8AEA 24.52%, #1093EB 35.07%, #1197EC 45.67%, #16B6F4 52.35%, #10CBF1 56.04%, #0FC6F1 59.73%, #15DEF0 64.76%, #15DEF0 81.25%)";
	};

	return (
		<div
			className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden flex flex-col items-center select-none"
			style={{
				background: getSkyBackground(),
			}}
		>
			{/* ─── Subtle grid overlay ──────────────────────────────────────── */}
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
			{/* ─── FIXED BACKDROP LAYERS ────────────────────────────────────── */}
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

			{/* Cityscape backdrop */}
			<div
				className="fixed left-0 right-0 pointer-events-none select-none"
				style={{
					bottom: "72px",
					height: "28vh",
					backgroundImage: "url('/cityscape.svg')",
					backgroundRepeat: "repeat-x",
					backgroundPosition: "bottom",
					backgroundSize: "auto 100%",
					zIndex: 3,
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

			{/* ─── SCROLLABLE PAGE CONTENT ─────────────────────────────────── */}
			<div className="relative w-full min-h-screen z-10 flex flex-col items-center pt-28 pb-80 px-4 md:px-8">
				
				{/* Top-Left: MIC Logo (Linked to Dashboard) */}
				<div className="absolute top-6 left-6 md:left-12 z-50">
					<Link href="/main">
						<Image
							src="/images/mic-logo.png"
							alt="MIC Logo"
							width={72}
							height={72}
							className="object-contain hover:scale-105 transition-transform duration-200"
							priority
							style={{ height: "auto" }}
						/>
					</Link>
				</div>

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

				{/* Title Heading */}
				<h1
					className="font-press-start text-black text-center mb-16 tracking-wider select-none animate-bounce"
					style={{
						fontSize: "clamp(2rem, 5vw, 3.5rem)",
						textShadow: "4px 4px 0px #FFFFFF",
						animationDuration: "3s"
					}}
				>
					Events
				</h1>

				{/* Cards Responsive Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl w-full mx-auto justify-items-center">
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
