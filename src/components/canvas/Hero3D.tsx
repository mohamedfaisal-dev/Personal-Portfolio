"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleSphere() {
  const pointsRef = useRef<THREE.Points>(null);

  // Detect low-powered device and reduce particle count accordingly
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 600 : 1200;

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 2.5;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    return [pos];
  }, [count]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.03;
      pointsRef.current.rotation.x = elapsed * 0.01;

      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        state.pointer.x * 0.8,
        0.05
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        state.pointer.y * 0.8,
        0.05
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a855f7"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: false, // Disable antialiasing for better performance
          alpha: true,
          powerPreference: "high-performance",
          depth: false,
          stencil: false,
        }}
        dpr={[1, 1.5]} // Cap DPR at 1.5 (not 2) to halve GPU fill on Retina
        frameloop="always"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} color="#06b6d4" />
        <ParticleSphere />
      </Canvas>
    </div>
  );
}
