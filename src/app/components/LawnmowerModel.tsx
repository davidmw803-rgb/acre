import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LawnmowerModelProps {
  color: string;
  autoRotate?: boolean;
}

export function LawnmowerModel({ color, autoRotate = true }: LawnmowerModelProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  const bodyMaterial = <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />;
  const darkMetal = <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />;
  const rubber = <meshStandardMaterial color="#222222" roughness={0.9} metalness={0.1} />;
  const chrome = <meshStandardMaterial color="#cccccc" roughness={0.1} metalness={1.0} />;
  const glass = <meshStandardMaterial color="#88ccff" roughness={0.05} metalness={0.3} transparent opacity={0.6} />;
  const accentMaterial = <meshStandardMaterial color="#44cc44" roughness={0.4} metalness={0.3} emissive="#22aa22" emissiveIntensity={0.15} />;

  return (
    <group ref={groupRef} position={[0, -0.8, 0]} scale={1.1}>
      {/* === MAIN CHASSIS === */}
      {/* Lower body - wide base platform */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[2.4, 0.3, 1.6]} />
        {darkMetal}
      </mesh>

      {/* Main body shell - sleek rounded top */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[2.2, 0.5, 1.4]} />
        {bodyMaterial}
      </mesh>

      {/* Upper body dome - smooth aerodynamic top */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[1.8, 0.25, 1.2]} />
        {bodyMaterial}
      </mesh>

      {/* Front nose - tapered front */}
      <mesh position={[1.15, 0.45, 0]} castShadow>
        <boxGeometry args={[0.3, 0.4, 1.2]} />
        {bodyMaterial}
      </mesh>

      {/* Rear section */}
      <mesh position={[-1.1, 0.45, 0]} castShadow>
        <boxGeometry args={[0.3, 0.35, 1.2]} />
        {bodyMaterial}
      </mesh>

      {/* === SENSOR DOME (top center) === */}
      <mesh position={[0.2, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {glass}
      </mesh>
      <mesh position={[0.2, 1.13, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
        {darkMetal}
      </mesh>

      {/* === LED STRIP (front) === */}
      <mesh position={[1.31, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.8]} />
        {accentMaterial}
      </mesh>

      {/* === REAR STATUS LIGHTS === */}
      <mesh position={[-1.26, 0.5, 0.35]}>
        <boxGeometry args={[0.02, 0.06, 0.15]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-1.26, 0.5, -0.35]}>
        <boxGeometry args={[0.02, 0.06, 0.15]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>

      {/* === WHEELS === */}
      {/* Front-left wheel */}
      <group position={[0.8, 0.0, 0.85]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 24]} />
          {rubber}
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.13, 16]} />
          {chrome}
        </mesh>
      </group>

      {/* Front-right wheel */}
      <group position={[0.8, 0.0, -0.85]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 24]} />
          {rubber}
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.13, 16]} />
          {chrome}
        </mesh>
      </group>

      {/* Rear-left wheel (larger) */}
      <group position={[-0.8, 0.0, 0.85]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.14, 24]} />
          {rubber}
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 16]} />
          {chrome}
        </mesh>
      </group>

      {/* Rear-right wheel (larger) */}
      <group position={[-0.8, 0.0, -0.85]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.14, 24]} />
          {rubber}
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.15, 16]} />
          {chrome}
        </mesh>
      </group>

      {/* === CUTTING DECK (underneath) === */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.8, 0.1, 1.3]} />
        {darkMetal}
      </mesh>

      {/* Blade disc */}
      <mesh position={[0, -0.12, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.03, 32]} />
        {chrome}
      </mesh>

      {/* === BUMPER SENSORS (front) === */}
      <mesh position={[1.25, 0.25, 0]}>
        <boxGeometry args={[0.08, 0.15, 1.5]} />
        {darkMetal}
      </mesh>

      {/* === SIDE VENTS === */}
      {[0.4, 0.5, 0.6].map((y, i) => (
        <mesh key={`vent-l-${i}`} position={[0, y, 0.71]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          {darkMetal}
        </mesh>
      ))}
      {[0.4, 0.5, 0.6].map((y, i) => (
        <mesh key={`vent-r-${i}`} position={[0, y, -0.71]}>
          <boxGeometry args={[0.6, 0.02, 0.01]} />
          {darkMetal}
        </mesh>
      ))}

      {/* === ACRE LOGO PLATE (top) === */}
      <mesh position={[0.5, 1.035, 0]}>
        <boxGeometry args={[0.4, 0.01, 0.15]} />
        {chrome}
      </mesh>

      {/* === CHARGING PORT (rear) === */}
      <mesh position={[-1.26, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.04, 12]} />
        {chrome}
      </mesh>
    </group>
  );
}
