import React from 'react';
import Image from 'next/image';

// Props for the NonTechSecCard
interface NonTechSecCardProps {
  name: string;        // The name to display on the card
  imageSrc?: string;   // (Optional) The image URL to display in the image area
}

/**
 * NonTechSecCard - Pixel-perfect card for the Non-Tech Secretary role, matching Figma.
 * Uses nontech.svg as the card background, overlays the name, leaves a blank image area.
 * The stars are already part of the SVG, so no extra overlay is needed.
 */
const NonTechSecCard: React.FC<NonTechSecCardProps> = ({ name, imageSrc = '/images/mic_board/nontechsec_vishnu.jpg' }) => {
  // SVG dimensions from nontech.svg
  const CARD_WIDTH = 327;
  const CARD_HEIGHT = 279;
  // Image placeholder area (same as PresidentCard)
  const IMAGE_X = 179;
  const IMAGE_Y = 81;
  const IMAGE_W = 112;
  const IMAGE_H = 118;
  // Name position (same as PresidentCard)
  const NAME_X = 40;
  const NAME_Y = 120;

  return (
    <div
      className="relative"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      {/* Card background SVG (includes stars at the bottom) */}
      <img
        src="/images/nontech.svg"
        alt="Non-Tech Secretary Card Background"
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        className="absolute top-0 left-0 w-full h-full select-none pointer-events-none"
        draggable="false"
        aria-hidden="true"
      />

      {/* NAME: Insert the Non-Tech Secretary's name here. Update the 'name' prop to change the displayed name. */}
      <div
        className="absolute z-10 font-press-start text-[20px] text-black"
        style={{ left: NAME_X, top: NAME_Y, width: 120, textAlign: 'left', lineHeight: 1 }}
      >
        {'Vishnu  Swaroop'}
      </div>

      {/* IMAGE: Insert the Non-Tech Secretary's image here. To add an image, pass the 'imageSrc' prop. */}
      <div
        className="absolute z-10 bg-gray-300 rounded-[12px] border border-gray-400 overflow-hidden"
        style={{ left: IMAGE_X, top: IMAGE_Y, width: IMAGE_W, height: IMAGE_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* If imageSrc is provided, show the image. Otherwise, keep blank. */}
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Non-Tech Secretary Profile"
            width={IMAGE_W * 1.3}
            height={IMAGE_H * 1.3}
            className="object-cover w-full h-full rounded-[12px]"
            style={{
              transform: 'scale(1.2)',          // Zoom in by 20%
              transformOrigin: 'center center',
              objectPosition: '+2px center', // Center the image
            }}
          />
        ) : null}
      </div>

      {/* No need to add stars.svg here; the stars are already part of nontech.svg. */}
    </div>
  );
};

export default NonTechSecCard; 