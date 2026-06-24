"use client";

import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import Model from "./models/model";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
} from "@react-three/drei";

const RotatingModel: React.FC = () => {
  const ref = useRef<THREE.Group>(null);

  const speed = useRef({
    x: (Math.random() - 0.5) * 0.02,
    y: (Math.random() - 0.5) * 0.02,
    z: (Math.random() - 0.5) * 0.02,
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += speed.current.x;
      ref.current.rotation.y += speed.current.y;
      ref.current.rotation.z += speed.current.z;
    }
  });

  return (
    <Model
      rotation={[
        Math.PI / 2,
        3 * (Math.PI / 2) * 1.1,
        (Math.PI / 4) * 1.1,
      ]}
      ref={ref}
    />
  );
};

const ModelScene: React.FC = () => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "80vh",
      }}
      camera={{ position: [0, 0, 8], fov: 50 }}
    >
      <OrbitControls />
      <Suspense fallback={null}>
        <RotatingModel />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default ModelScene;
