import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function HeartMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  heartShape.moveTo(x + 0.5, y + 0.5);
  heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
  heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
  heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
  heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
  heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
  heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

  const extrudeSettings = {
    depth: 0.4,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-0.5, -0.8, 0]} scale={1.2}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <MeshDistortMaterial
          color="#00d2ff"
          emissive="#00d2ff"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.15}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  const spheres = [];
  for (let i = 0; i < 30; i++) {
    const t = (i / 30) * Math.PI * 4;
    const y = (i / 30) * 4 - 2;
    spheres.push(
      <mesh key={`a-${i}`} position={[Math.cos(t) * 0.8, y, Math.sin(t) * 0.8]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00d2ff" emissive="#00d2ff" emissiveIntensity={0.6} />
      </mesh>,
      <mesh key={`b-${i}`} position={[Math.cos(t + Math.PI) * 0.8, y, Math.sin(t + Math.PI) * 0.8]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.6} />
      </mesh>
    );
    if (i % 3 === 0) {
      spheres.push(
        <mesh key={`bar-${i}`} position={[0, y, 0]} rotation={[0, t, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
          <meshStandardMaterial color="#ffffff" opacity={0.2} transparent />
        </mesh>
      );
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>{spheres}</group>
    </Float>
  );
}

export default function Heart3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00d2ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#10b981" />
        <HeartMesh />
        <DNAHelix />
      </Canvas>
    </div>
  );
}
