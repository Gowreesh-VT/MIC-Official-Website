import { useState, useEffect } from 'react';
import { ARCADE_WIDTH, ARCADE_HEIGHT } from '../app/leaderboard/_components/constants';

export function useResponsiveScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;
      const scaleX = maxWidth / ARCADE_WIDTH;
      const scaleY = maxHeight / ARCADE_HEIGHT;
      
      // Simple scaling with bounds
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(Math.max(newScale, 0.2)); // Minimum scale for readability
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return scale;
} 