import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface LawnmowerModelProps {
  color: string;
}

function createBodyShape() {
  const shape = new THREE.Shape();
  // Low-profile, aerodynamic side profile (viewed from the side, XY plane)
  // Front is +X, rear is -X
  shape.moveTo(-1.1, 0.08);
  // Bottom edge - flat undercarriage
  shape.lineTo(1.2, 0.08);
  // Front bumper curve up
  shape.quadraticCurveTo(1.4, 0.08, 1.4, 0.25);
  // Front face going up
  shape.quadraticCurveTo(1.4, 0.45, 1.2, 0.55);
  // Hood slope up to peak
  shape.quadraticCurveTo(0.6, 0.78, 0.1, 0.82);
  // Roof peak to rear slope
  shape.quadraticCurveTo(-0.4, 0.8, -0.8, 0.6);
  // Rear drop
  shape.quadraticCurveTo(-1.15, 0.45, -1.2, 0.3);
  // Rear face
  shape.quadraticCurveTo(-1.2, 0.08, -1.1, 0.08);
  return shape;
}

function Wheel({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const teal = '#00d4aa';
  return (
    <group position={position} scale={scale}>
      {/* Tire */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.22, 0.1, 12, 24]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.08, 24]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        <meshStandardMaterial color="#333" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Teal accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.015, 8, 32]} />
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.6} roughness={0.2} metalness={0.5} />
      </mesh>
      {/* Outer teal ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.012, 8, 32]} />
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.4} roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  );
}

export function LawnmowerModel({ color }: LawnmowerModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const teal = '#00d4aa';

  const bodyShape = useMemo(() => createBodyShape(), []);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 1.3,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 6,
  }), []);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={1.0}>
      {/* === MAIN BODY — extruded aerodynamic shell === */}
      <mesh position={[0, 0, -0.65]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, extrudeSettings]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.65} />
      </mesh>

      {/* === FRONT LED STRIP — sweeping teal light === */}
      <mesh position={[1.3, 0.35, 0]}>
        <boxGeometry args={[0.03, 0.04, 1.1]} />
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.8} roughness={0.1} />
      </mesh>
      {/* Side-wrap LEDs left */}
      <mesh position={[1.15, 0.35, 0.6]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.35, 0.035, 0.03]} />
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.6} roughness={0.1} />
      </mesh>
      {/* Side-wrap LEDs right */}
      <mesh position={[1.15, 0.35, -0.6]} rotation={[0, -0.5, 0]}>
        <boxGeometry args={[0.35, 0.035, 0.03]} />
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.6} roughness={0.1} />
      </mesh>

      {/* === REAR LED STRIPS === */}
      <mesh position={[-1.15, 0.3, 0.35]}>
        <boxGeometry args={[0.03, 0.05, 0.25]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-1.15, 0.3, -0.35]}>
        <boxGeometry args={[0.03, 0.05, 0.25]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>

      {/* === SENSOR TURRET (camera tower on top) === */}
      <group position={[-0.15, 0.82, 0]}>
        {/* Base mount */}
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.06, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[0.12, 0.3, 0.12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Camera head */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <boxGeometry args={[0.18, 0.14, 0.16]} />
          <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Camera lens */}
        <mesh position={[0.1, 0.38, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.04, 12]} />
          <meshStandardMaterial color="#1a3a4a" roughness={0.05} metalness={0.9} />
        </mesh>
        {/* Secondary lens */}
        <mesh position={[0.1, 0.42, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
          <meshStandardMaterial color="#1a3a4a" roughness={0.05} metalness={0.9} />
        </mesh>
        {/* Status LED on turret */}
        <mesh position={[0.09, 0.34, 0]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={1.0} />
        </mesh>
      </group>

      {/* === TOP DISPLAY PANEL === */}
      <mesh position={[0.45, 0.78, 0]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.3, 0.01, 0.2]} />
        <meshStandardMaterial color="#0a1520" roughness={0.05} metalness={0.3} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0.45, 0.785, 0]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.25, 0.005, 0.15]} />
        <meshStandardMaterial color="#114433" emissive={teal} emissiveIntensity={0.15} roughness={0.05} />
      </mesh>

      {/* === WHEELS — large aggressive style === */}
      {/* Front wheels */}
      <Wheel position={[0.85, 0.05, 0.72]} scale={0.9} />
      <Wheel position={[0.85, 0.05, -0.72]} scale={0.9} />
      {/* Rear wheels (larger) */}
      <Wheel position={[-0.75, 0.05, 0.72]} scale={1.1} />
      <Wheel position={[-0.75, 0.05, -0.72]} scale={1.1} />

      {/* === WHEEL ARCHES — fender flares === */}
      {[
        { x: 0.85, z: 0.62, s: 0.9 },
        { x: 0.85, z: -0.62, s: 0.9 },
        { x: -0.75, z: 0.62, s: 1.1 },
        { x: -0.75, z: -0.62, s: 1.1 },
      ].map((w, i) => (
        <mesh key={`arch-${i}`} position={[w.x, 0.18, w.z]} castShadow>
          <boxGeometry args={[0.45 * w.s, 0.22, 0.12]} />
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.65} />
        </mesh>
      ))}

      {/* === UNDERCARRIAGE / CUTTING DECK === */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.8, 0.06, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* === FRONT BUMPER === */}
      <mesh position={[1.35, 0.18, 0]} castShadow>
        <boxGeometry args={[0.12, 0.18, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* === SIDE ACCENT LINES (body crease) === */}
      <mesh position={[0.1, 0.42, 0.72]}>
        <boxGeometry args={[1.8, 0.015, 0.01]} />
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.1, 0.42, -0.72]}>
        <boxGeometry args={[1.8, 0.015, 0.01]} />
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.3} />
      </mesh>

      {/* === CHARGING PORT (rear) === */}
      <mesh position={[-1.18, 0.25, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 10]} />
        <meshStandardMaterial color="#333" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* === ACRE BADGE (front top) === */}
      <mesh position={[0.9, 0.65, 0]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.18, 0.005, 0.08]} />
        <meshStandardMaterial color="#ccc" roughness={0.05} metalness={1.0} />
      </mesh>
    </group>
  );
}
