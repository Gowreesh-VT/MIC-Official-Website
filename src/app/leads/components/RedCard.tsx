import React from 'react';
import Image from 'next/image';

interface RedCardProps {
  name: string;
  title?: string;
  imageSrc?: string;
  imagePosition?: string;
}

const RedCard: React.FC<RedCardProps> = ({ name, title, imageSrc, imagePosition }) => {
  // SVG dimensions
  const CARD_WIDTH = 327;
  const CARD_HEIGHT = 279;

  // Positions
  const IMAGE_X = 179;
  const IMAGE_Y = 81;
  const IMAGE_W = 112;
  const IMAGE_H = 118;

  const NAME_X = 24;
  const NAME_Y = 120;

  return (
    <div
      className="relative"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      {/* Background SVG */}
      <img
        src="/images/card.svg"
        alt="Vice-President Card Background"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        className="absolute top-0 left-0 w-full h-full select-none pointer-events-none"
        draggable="false"
        aria-hidden="true"
      />

      {/* Name */}
      <div
        className="absolute z-10 font-press-start text-black flex flex-col justify-center"
        style={{
          left: NAME_X,
          top: NAME_Y - 10,
          width: 150,
          height: 60,
          textAlign: 'left',
          lineHeight: 1.4,
          fontSize: name.length > 15 ? '12.5px' : name.length > 9 ? '14px' : '16px',
          wordBreak: 'break-word',
        }}
      >
        {name}
      </div>

      {/* Image Area */}
      <div
        className="absolute z-10"
        style={{
          left: IMAGE_X,
          top: IMAGE_Y,
          width: IMAGE_W,
          height: IMAGE_H,
        }}
      >
        <div
          className="bg-gray-300 rounded-[12px] border border-gray-400 flex items-center justify-center relative"
          style={{
            width: IMAGE_W,
            height: IMAGE_H,
            position: 'relative',
          }}
        >
          {imageSrc && (
            <Image
              src={imageSrc}
              alt="Vice-President Profile"
              width={IMAGE_W}
              height={IMAGE_H}
              className="object-cover w-full h-full rounded-[12px]"
              style={{
                transform: 'scale(1.1)',          // Zoom in by 20%
                transformOrigin: 'center center',
                objectPosition: imagePosition || '+2px center', // Center the image
              }}
            />
          )}
          {/* {title && (
            <div
              className="absolute font-press-start text-[18px] text-black"
              style={{
                top: -60,
                
                transform: 'translateX(-40%)',
                textAlign: 'center',
                lineHeight: 1,
              
              }}
            >
              {title}
            </div>
          )} */}
          {title && (
            <div
              className="absolute z-10 font-press-start text-black font-bold flex flex-col justify-center items-center"
              style={{
                top: -72,
                left: '-15%',
                width: 240,
                height: 35,
                transform: 'translateX(-50%)',
                textAlign: 'center',
                lineHeight: 1.3,
                fontSize: title.length > 18 ? '11px' : title.length > 14 ? '12px' : '14px',
              }}
            >
              {title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedCard;
