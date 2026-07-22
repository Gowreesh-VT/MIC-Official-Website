import React from 'react';
import Image from 'next/image';

interface PixelCardProps {
  name: string;
  title: string;
  imageSrc?: string;
  imagePosition?: string;
}

const PixelCard: React.FC<PixelCardProps> = ({ name, title, imageSrc, imagePosition }) => {
  const CARD_WIDTH = 323;
  const CARD_HEIGHT = 211;

  // Exact coordinates matching the SVG layout
  const IMAGE_X = 181;
  const IMAGE_Y = 75;
  const IMAGE_W = 104;
  const IMAGE_H = 107;

  const NAME_X = 28;
  const NAME_Y = 72;
  const NAME_W = 143;
  const NAME_H = 115;

  const TITLE_X = 12;
  const TITLE_Y = 8;
  const TITLE_W = 299;
  const TITLE_H = 41;

  return (
    <div
      className="relative select-none pointer-events-auto"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      {/* Card Background SVG */}
      <img
        src="/images/president_box.svg"
        alt="Card Background"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        className="absolute top-0 left-0 w-full h-full select-none pointer-events-none"
        draggable="false"
        aria-hidden="true"
      />

      {/* Dynamic Title Overlay */}
      <div
        className="absolute z-10 font-press-start text-black font-bold uppercase flex items-center justify-center text-center"
        style={{
          left: TITLE_X,
          top: TITLE_Y,
          width: TITLE_W,
          height: TITLE_H,
          fontSize: title.length > 18 ? '9px' : title.length > 12 ? '11px' : '13px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>

      {/* Dynamic Name Overlay */}
      <div
        className="absolute z-10 font-press-start text-[#1B1B1B] font-bold uppercase flex flex-col justify-center text-left break-words"
        style={{
          left: NAME_X,
          top: NAME_Y,
          width: NAME_W,
          height: NAME_H,
          fontSize: name.length > 16 ? '11px' : name.length > 10 ? '12px' : '14px',
          lineHeight: 1.4,
        }}
      >
        {name}
      </div>

      {/* Dynamic Profile Image Box */}
      <div
        className="absolute z-10 bg-white border-4 border-black overflow-hidden flex items-center justify-center"
        style={{
          left: IMAGE_X,
          top: IMAGE_Y,
          width: IMAGE_W,
          height: IMAGE_H,
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            width={IMAGE_W}
            height={IMAGE_H}
            className="object-cover w-full h-full"
            style={{
              objectPosition: imagePosition || 'center center',
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
    </div>
  );
};

export default PixelCard;
