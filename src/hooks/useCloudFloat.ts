import { useState, useEffect, useRef } from 'react';
import { CloudProps } from '../app/leaderboard/_components/types';

// Animated cloud movement with viewport bounds
export function useCloudFloat({
  baseTop,
  baseLeft,
  amplitude = 30,
  speed = 1,
  phase = 0,
}: CloudProps) {
  const [top, setTop] = useState(baseTop);
  const frame = useRef(0);

  useEffect(() => {
    let running = true;
    function animate() {
      frame.current += 1;
      const t = frame.current / 60; // 60fps
      const newTop = Number(baseTop) + Math.sin(t * speed + phase) * amplitude;
      // Clamp to viewport bounds
      const clampedTop = Math.max(-100, Math.min(window.innerHeight - 50, newTop));
      setTop(clampedTop);
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [baseTop, amplitude, speed, phase]);

  return { top, left: baseLeft };
} 