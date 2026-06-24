import React from 'react';
import { TableRow } from './types';
import { SANS_FONT, MONO_FONT } from './constants';

interface LeaderboardTableProps {
  rows: TableRow[];
  tab: string;
  themeColors?: {
    textColor: string;
    lineColor: string;
    borderColor: string;
  };
}

export function LeaderboardTable({ rows, tab, themeColors }: LeaderboardTableProps) {
  return (
    <div
      style={{
        width: '95%',
        maxWidth: 900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
        fontFamily: SANS_FONT,
        padding: '0 20px',
        boxSizing: 'border-box',
      }}
    >
      {rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            background: themeColors?.textColor === 'text-white' ? '#fff9d6' : '#ffffff',
            padding: '16px 18px',
            fontSize: 14, // Reduced from 20 for Press Start 2P
            fontWeight: 700,
            fontFamily: SANS_FONT,
            boxSizing: 'border-box',
            overflow: 'hidden',
            minHeight: 80,
          }}
        >
          <div
            style={{
              fontSize: 18, // Reduced from 28 for Press Start 2P
              fontWeight: 900,
              color: themeColors?.textColor === 'text-white' ? '#222' : '#1f2937',
              width: 40,
              textAlign: 'center',
              fontFamily: MONO_FONT,
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
          <div style={{ flex: 1, marginLeft: 16, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontWeight: 900,
                  color: themeColors?.textColor === 'text-white' ? '#222' : '#1f2937',
                  fontSize: 14, // Reduced from 20 for Press Start 2P
                  fontFamily: SANS_FONT,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {row.name}
              </span>
              <span
                style={{
                  fontSize: 8, // Reduced from 12 for Press Start 2P
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: tab === 'ffcs' ? '#f9c' : '#bada9f',
                  color: themeColors?.textColor === 'text-white' ? '#222' : '#1f2937',
                  fontWeight: 700,
                  fontFamily: MONO_FONT,
                  flexShrink: 0,
                }}
              >
                {row.tag || (tab === 'ffcs' ? 'PRO' : 'NON-FFCS')}
              </span>
            </div>
            <div style={{ 
              fontSize: 8, // Reduced from 12 for Press Start 2P
              color: '#555', 
              marginTop: 2, 
              fontFamily: MONO_FONT,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {row.id} - {row.dept}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              minWidth: 80,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 16, // Reduced from 24 for Press Start 2P
                color: themeColors?.textColor === 'text-white' ? '#222' : '#1f2937',
                fontFamily: MONO_FONT,
                lineHeight: 1,
              }}
            >
              {row.xp}
            </div>
            <div 
              style={{ 
                fontSize: 7, // Reduced from 10 for Press Start 2P
                color: '#666', 
                fontWeight: 700, 
                fontFamily: MONO_FONT,
                marginTop: 2,
                letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
              }}
            >
              XP POINTS
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 