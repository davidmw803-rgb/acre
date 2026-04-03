import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface LawnmowerModelProps {
  color: string;
}

// Vertex classification based on position in the model's bounding box
// The Meshy model bbox: x(-0.95, 0.95), y(-0.49, 0.49), z(-0.53, 0.53)
function classifyVertex(x: number, y: number, _z: number): 'body' | 'underbody' | 'wheels' | 'turret' {
  // Top turret/camera pod: high Y, centered X/Z
  if (y > 0.32) return 'turret';
  // Underbody: very low
  if (y < -0.3) return 'underbody';
  // Wheel area: low Y and near the edges in X and Z
  if (y < -0.05 && (Math.abs(x) > 0.45)) return 'wheels';
  // Everything else is body
  return 'body';
}

export function LawnmowerModel({ color }: LawnmowerModelProps) {
  const { scene } = useGLTF('/models/mower.glb');
  const teal = '#00FFD1';

  // Create materials
  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.15,
      metalness: 0.1,
    }),
    underbody: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2A2A2A'),
      roughness: 0.8,
      metalness: 0.2,
    }),
    wheels: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111111'),
      roughness: 0.9,
      metalness: 0.05,
    }),
    turret: new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111111'),
      roughness: 0.9,
      metalness: 0.05,
    }),
  }), []);

  // Update body color when it changes
  useEffect(() => {
    materials.body.color.set(color);
    materials.body.needsUpdate = true;
  }, [color, materials]);

  // Split the single mesh into multiple meshes by material zone
  const splitMeshes = useMemo(() => {
    const meshes: THREE.Mesh[] = [];

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        const geo = child.geometry as THREE.BufferGeometry;
        const positions = geo.getAttribute('position');

        if (!positions) return;

        // Compute normals since the model doesn't have them
        geo.computeVertexNormals();

        // Classify each face (triangle) by its centroid
        const vertCount = positions.count;
        const indexAttr = geo.index;
        const triCount = indexAttr ? indexAttr.count / 3 : vertCount / 3;

        // Bucket faces by material zone
        const buckets: Record<string, number[]> = {
          body: [],
          underbody: [],
          wheels: [],
          turret: [],
        };

        for (let t = 0; t < triCount; t++) {
          let i0: number, i1: number, i2: number;
          if (indexAttr) {
            i0 = indexAttr.getX(t * 3);
            i1 = indexAttr.getX(t * 3 + 1);
            i2 = indexAttr.getX(t * 3 + 2);
          } else {
            i0 = t * 3;
            i1 = t * 3 + 1;
            i2 = t * 3 + 2;
          }

          // Centroid of the triangle
          const cx = (positions.getX(i0) + positions.getX(i1) + positions.getX(i2)) / 3;
          const cy = (positions.getY(i0) + positions.getY(i1) + positions.getY(i2)) / 3;
          const cz = (positions.getZ(i0) + positions.getZ(i1) + positions.getZ(i2)) / 3;

          const zone = classifyVertex(cx, cy, cz);
          buckets[zone].push(i0, i1, i2);
        }

        // Create separate meshes for each zone
        for (const [zone, indices] of Object.entries(buckets)) {
          if (indices.length === 0) continue;

          const newGeo = geo.clone();
          newGeo.setIndex(indices);
          newGeo.computeVertexNormals();

          const mat = materials[zone as keyof typeof materials];
          const mesh = new THREE.Mesh(newGeo, mat);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          meshes.push(mesh);
        }
      }
    });

    return meshes;
  }, [scene, materials]);

  return (
    <group position={[0, -0.1, 0]} scale={2.2}>
      {splitMeshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}

      {/* Front LED strip - emissive teal */}
      <mesh position={[0.92, -0.02, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.02, 0.03, 0.85]} />
        <meshStandardMaterial
          color={teal}
          emissive={teal}
          emissiveIntensity={2.0}
          roughness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* Wheel accent rings */}
      {[
        [0.55, -0.35, 0.5],
        [0.55, -0.35, -0.5],
        [-0.55, -0.35, 0.5],
        [-0.55, -0.35, -0.5],
      ].map((pos, i) => (
        <mesh key={`ring-${i}`} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.012, 8, 32]} />
          <meshStandardMaterial
            color={teal}
            emissive={teal}
            emissiveIntensity={3.0}
            roughness={0.1}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Preload with Draco
useGLTF.preload('/models/mower.glb');
