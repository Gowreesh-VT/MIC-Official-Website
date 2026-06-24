"use client";

import React, { useState } from "react";
import { useThemeBackground } from "@/app/gallery/hooks/useThemeBackground";
import Image from "next/image";
import NavArrow from "./NavArrow";
import { motion, AnimatePresence } from "framer-motion";

const rightPageUp = [
  ["/blueghost.png", "/ghost.png", "/greenghost.png"],
  ["/ghost.png", "/blueghost.png", "/greenghost.png"],
  ["/greenghost.png", "/ghost.png", "/blueghost.png"],
];

const rightPageDown = [
  ["/blueghost.png", "/ghost.png", "/greenghost.png"],
  ["/ghost.png", "/blueghost.png", "/greenghost.png"],
  ["/greenghost.png", "/ghost.png", "/blueghost.png"],
];

const leftPollaroid = [
  ["/ghost.png", "/greenghost.png", "/greenghost.png"],
  ["/ghost.png", "/blueghost.png", "/greenghost.png"],
  ["/greenghost.png", "/ghost.png", "/blueghost.png"],
];

const GalleryPage = () => {
  const { background, gridOpacity, textColor } = useThemeBackground();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(rightPageUp[0][0]);

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < rightPageUp.length) {
      setCurrentPage(index);
      setSelectedImage(rightPageUp[index][0]);
    }
  };

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden flex items-center justify-center ${textColor}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, ${gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${gridOpacity} 1px, transparent 1px),
          ${background}
        `,
        backgroundSize: "30px 30px, 30px 30px, 100% 100%",
        backgroundRepeat: "repeat, repeat, no-repeat",
        backgroundPosition: "top left, top left, center",
      }}
    >
      <div className="absolute top-4 left-4 z-50">
        <Image src="/Logo.svg" alt="MIC Logo" width={63} height={63} />
      </div>

      <div className="absolute" style={{ top: "55px", left: "34px" }}>
        <Image
          src="/Subtract.png"
          alt="galleryPage"
          width={690}
          height={684}
          className="h-[780px] pointer-events-none"
        />
      </div>

      <div className="absolute z-10" style={{ top: "55px", left: "719px" }}>
        <div className="relative h-[780px] w-[53px] pointer-events-none">
          <Image
            src="/Rectangle 15273.png"
            alt="galleryPage"
            fill
            className="pointer-events-none"
          />
        </div>
      </div>

      <div className="absolute right-1 top-[60px] flex flex-col gap-10 z-10">
        {rightPageUp.map((_, index) => (
          <NavArrow
            key={index}
            isActive={currentPage === index}
            onClick={() => handlePageChange(index)}
          />
        ))}
      </div>

      <div
        className="absolute z-20 pointer-events-none"
        style={{ top: "55px", right: "64px" }}
      >
        <Image
          src="/SubtractRight.png"
          alt=""
          width={690}
          height={684}
          className="h-[780px]"
        />
      </div>

      <div className="absolute top-[88px] left-[685px] z-30 pointer-events-none">
        <Image
          src="/Group 415.png"
          alt="galleryPage"
          width={120}
          height={400}
          className="h-[720px]"
        />
      </div>

      <div className="absolute top-[100px] left-[80px] z-30 grid grid-cols-2 gap-[40px]">
        <div>
          <Image
            src="/plane.svg"
            alt="plane"
            width={104}
            height={61}
            className="absolute z-50 top-[-20px]"
          />
          <Image
            src="/galleryWindow.svg"
            alt="gallery frame"
            width={522}
            height={474}
            className="relative top-[-2px] left-[20px] w-[550px]"
          />
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt="selected"
              width={510}
              height={500}
              className="absolute top-[13px] left-[40px]"
              style={{ height: "375px" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
          <Image
            src="/mushroom.svg"
            alt="mushroom"
            width={46}
            height={33}
            className="absolute top-[360px] left-[540px] w-[46px]"
          />
        </div>
      </div>

      <div className="absolute top-[450px] left-0 right-0 flex flex-col gap-[50px] items-end px-[80px] z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={`top-${currentPage}`}
            className="relative w-[600px] h-[300px] mt-[-320px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {rightPageUp[currentPage].map((img, idx) => (
              <div
                key={`right-${idx}`}
                className={`absolute w-[200px] h-[250px] cursor-pointer ${
                  idx === 0
                    ? "left-10 top-0 z-10"
                    : idx === 1
                    ? "left-1/2 top-[-40px] -translate-x-1/2 z-20"
                    : "right-10 top-0 z-10"
                }`}
              >
                <Image
                  src="/polaroidFrame.svg"
                  alt="frame"
                  width={200}
                  height={250}
                />
                <div
                  className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
                  onClick={() => handleImageClick(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={160}
                    height={160}
                  />
                </div>

                {idx === 1 && (
                  <Image
                    src="/leafIcon.png"
                    alt="star"
                    width={40}
                    height={40}
                    className="absolute top-[-10px] right-[-10px] z-30"
                    style={{ imageRendering: "pixelated" }}
                  />
                )}

              </div>
            ))}
          </motion.div>
          <div className="absolute bottom-8 right-[610px] z-50">
            <Image
              src="/heartIcon.png"
              alt="Corner decoration"
              width={120}
              height={120}
              className="w-[50px] h-[50px] object-contain"
            />
          </div>
        </AnimatePresence>``

        <AnimatePresence mode="wait">
          <motion.div
            key={`bottom-${currentPage}`}
            className="relative w-[600px] h-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {rightPageDown[currentPage].map((img, idx) => (
              <div
                key={`bottom-${idx}`}
                className={`absolute w-[200px] h-[250px] cursor-pointer ${
                  idx === 0
                    ? "left-10 top-0 z-10"
                    : idx === 1
                    ? "left-1/2 top-[-40px] -translate-x-1/2 z-20"
                    : "right-10 top-0 z-10"
                }`}
              >
                <Image
                  src="/polaroidFrame.svg"
                  alt="frame"
                  width={200}
                  height={250}
                />
                <div
                  className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
                  onClick={() => handleImageClick(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={160}
                    height={160}
                  />
                </div>

                {idx === 2 && (
                  <Image
                    src="/starIcon.png" 
                    alt="star"
                    width={40}
                    height={40}
                    className="absolute top-[-10px] right-[-10px] z-30"
                    style={{ imageRendering: "pixelated" }}
                  />
                )}

              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`left-${currentPage}`}
          className="absolute top-[450px] left-0 ml-[75px] z-30"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative w-[600px] h-[300px] mt-[100px]">
            {leftPollaroid[currentPage].map((img, idx) => (
              <div
                key={`left-${idx}`}
                className={`absolute w-[200px] h-[250px] cursor-pointer ${
                  idx === 0
                    ? "left-10 top-0 z-10"
                    : idx === 1
                    ? "left-1/2 top-[-40px] -translate-x-1/2 z-20"
                    : "right-10 top-0 z-10"
                }`}
              >
                <Image
                  src="/polaroidFrame.svg"
                  alt="frame"
                  width={200}
                  height={250}
                />
                <div
                  className="absolute top-[30px] left-[20px] w-[160px] h-[160px] overflow-hidden"
                  onClick={() => handleImageClick(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={160}
                    height={160}
                  />
                </div>
                {idx === 0 && (
                  <Image
                    src="/track.svg"
                    alt="track"
                    width={100}
                    height={150}
                    className="absolute top-[210px] left-[-30px]"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 right-12 z-50">
        <Image
          src="/menu.png"
          alt="Corner decoration"
          width={120}
          height={120}
          className="w-[50px] h-[50px] object-contain"
        />
      </div>
    </div>
  );
};

export default GalleryPage;
