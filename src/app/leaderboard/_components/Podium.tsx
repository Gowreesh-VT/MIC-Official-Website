import React from 'react';
import Image from 'next/image';
import { PodiumType } from './types';
import { PODIUM, PODIUM_STEPS, SANS_FONT, MONO_FONT } from './constants';

interface PodiumProps {
  podium: PodiumType[];
  themeColors?: {
    textColor: string;
    lineColor: string;
    borderColor: string;
    screenTextColor?: string;
    screenAccentColor?: string;
  };
}

export function Podium({ podium, themeColors }: PodiumProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: PODIUM.width,
        height: PODIUM.height,
        marginTop: 0,
      }}
    >
      <Image
        src="/images/podium.png"
        alt="Podium"
        width={PODIUM.width}
        height={PODIUM.height}
        style={{ 
          position: 'absolute', 
          left: 0, 
          top: 0, 
          zIndex: 1,
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
        priority
      />
      {podium.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: PODIUM_STEPS[i].cx - 40,
            top: PODIUM_STEPS[i].cy - 70,
            zIndex: 2,
            textAlign: 'center',
            width: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
                      <div
              style={{
                marginBottom: 5,
                fontFamily: SANS_FONT,
                fontWeight: 700,
                fontSize: 12, // Reduced from 16 for Press Start 2P
                color: themeColors?.screenTextColor ?? (themeColors?.textColor === 'text-white' ? '#fff' : '#1f2937'),
                textShadow: themeColors?.textColor === 'text-white' ? '0 2px 8px #000, 0 0 1px #000' : '0 2px 8px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.1)',
                lineHeight: 1.15,
                letterSpacing: 0.5,
                whiteSpace: 'nowrap',
              }}
            >
            {p.name}
                          <div
                style={{
                  marginTop: 2,
                  fontFamily: MONO_FONT,
                  fontWeight: 600,
                  fontSize: 11, // Reduced from 15 for Press Start 2P
                  color: themeColors?.screenAccentColor ?? (themeColors?.textColor === 'text-white' ? '#ffe066' : '#f59e0b'),
                  letterSpacing: '0.08em',
                  textShadow: themeColors?.textColor === 'text-white' ? '0 2px 8px #222, 0 0 2px #ffe066' : '0 2px 8px rgba(0,0,0,0.1), 0 0 2px #f59e0b',
                }}
              >
              {p.xp} XP
            </div>
          </div>
          <Image
            src={p.ghost}
            alt="ghost"
            width={56}
            height={56}
            style={{ margin: '0 auto', display: 'block' }}
          />
        </div>
      ))}
    </div>
  );
} 
