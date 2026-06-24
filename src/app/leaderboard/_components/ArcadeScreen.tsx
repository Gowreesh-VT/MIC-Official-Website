import React from 'react';
import { TableRow, PodiumType } from './types';
import { SCREEN, PODIUM, SANS_FONT, mockTable, mockPodium } from './constants';
import { Podium } from './Podium';
import { LeaderboardTable } from './LeaderboardTable';

interface ArcadeScreenProps {
  tab: string;
  themeColors: {
    textColor: string;
    lineColor: string;
    borderColor: string;
    screenTextColor?: string;
  };
}

export function ArcadeScreen({ tab, themeColors }: ArcadeScreenProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: SCREEN.left,
        top: SCREEN.top,
        width: SCREEN.width,
        height: SCREEN.height,
        zIndex: 2,
        color: themeColors.screenTextColor ?? (themeColors.textColor === 'text-white' ? 'white' : '#1f2937'),
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'none',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          fontSize: 20, // Reduced from 28 for Press Start 2P
          margin: '96px 0 16px 0',
          letterSpacing: 1, // Reduced from 2 for Press Start 2P
          fontWeight: 700,
          fontFamily: SANS_FONT,
        }}
      >
        {tab === 'all' ? 'LIVE RANKINGS' : tab === 'ffcs' ? 'FFCS MEMBERS' : 'NON-FFCS MEMBERS'}
      </div>
      
      {/* Podium or Table */}
      {tab === 'all' ? (
        <div
          style={{
            position: 'absolute',
            left: PODIUM.left,
            top: PODIUM.top,
            width: PODIUM.width,
            height: PODIUM.height,
          }}
        >
          <Podium podium={mockPodium} themeColors={themeColors} />
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: 330,
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            boxSizing: 'border-box',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <LeaderboardTable rows={mockTable} tab={tab} themeColors={themeColors} />
        </div>
      )}
    </div>
  );
} 
