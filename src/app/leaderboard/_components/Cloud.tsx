import React from 'react';
import Image from 'next/image';
import { CloudImageProps } from './types';
import { useCloudFloat } from '../../../hooks/useCloudFloat';

interface CloudComponentProps {
  cloud: CloudImageProps;
  viewportSize: { width: number; height: number };
}

export function CloudComponent({ cloud, viewportSize }: CloudComponentProps) {
  const float = useCloudFloat(cloud);
  
  // Skip rendering if cloud would be completely outside viewport
  if (viewportSize.width > 0 && (float.left > viewportSize.width || float.left + cloud.width < 0)) {
    return null;
  }
  
  return (
    <Image
      src={cloud.src}
      alt="Cloud"
      width={cloud.width}
      height={cloud.height}
      style={{
        position: 'absolute',
        left: viewportSize.width > 0 
          ? Math.max(-cloud.width * 0.3, Math.min(viewportSize.width - cloud.width * 0.7, float.left))
          : float.left,
        top: float.top,
        zIndex: 0,
        opacity: 0.92,
        pointerEvents: 'none',
        userSelect: 'none',
        filter: 'drop-shadow(0 6px 6px #0002)',
        transition: 'filter 0.2s',
      }}
      draggable={false}
      priority={false}
    />
  );
} 