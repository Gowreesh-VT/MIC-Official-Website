import React from 'react';
import Image from 'next/image';

interface RankingBannerProps {
  rank: 1 | 2 | 3;
  name: string;
  xp?: number;
}

const bannerConfig = {
  1: {
    color: '#FF4444', // Red
    medalColor: '#FFD700', // Gold
    borderColor: '#000000',
  },
  2: {
    color: '#87CEEB', // Light blue
    medalColor: '#C0C0C0', // Silver
    borderColor: '#000000',
  },
  3: {
    color: '#90EE90', // Light green
    medalColor: '#CD7F32', // Bronze
    borderColor: '#000000',
  },
};

export function RankingBanner({ rank, name, xp }: RankingBannerProps) {
  const config = bannerConfig[rank];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        height: '80px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        background: config.color,
        border: '3px solid',
        borderColor: config.borderColor,
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%)',
        boxSizing: 'border-box',
      }}
    >
      {/* Medal Icon */}
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: config.medalColor,
          border: '3px solid',
          borderColor: config.borderColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginRight: '20px',
          position: 'relative',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        <span
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: config.borderColor,
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          {rank}
        </span>
      </div>

      {/* Name */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontFamily: "'Press Start 2P', monospace",
            textShadow: '2px 2px 0px #000000',
            letterSpacing: '1px',
          }}
        >
          {name}
        </span>
        {xp && (
          <span
            style={{
              fontSize: '12px',
              color: '#FFFFFF',
              fontFamily: "'Press Start 2P', monospace",
              textShadow: '1px 1px 0px #000000',
              marginTop: '4px',
              opacity: 0.9,
            }}
          >
            {xp} XP
          </span>
        )}
      </div>
    </div>
  );
}

