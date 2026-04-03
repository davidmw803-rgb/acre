import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface LawnmowerModelProps {
  color: string;
}

export function LawnmowerModel({ color }: LawnmowerModelProps) {
  const { scene } = useGLTF('/models/mower.glb');

  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        roughness: 0.18,
        metalness: 0.1,
        clearcoat: 0.4,
        clearcoatRoughness: 0.15,
      }),
    []
  );

  const blackMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#111111'),
        roughness: 0.85,
        metalness: 0.05,
      }),
    []
  );

  useEffect(() => {
    bodyMat.color.set(color);
    bodyMat.needsUpdate = true;
  }, [color, bodyMat]);

  // Split mesh into body vs black parts using vertex colors
  const parts = useMemo(() => {
    const result: THREE.Mesh[] = [];

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.geometry) return;

      const geo = child.geometry as THREE.BufferGeometry;
      const positions = geo.getAttribute('position');
      if (!positions) return;

      geo.computeVertexNormals();

      const indexAttr = geo.index;
      const triCount = indexAttr ? indexAttr.count / 3 : positions.count / 3;

      const bodyIndices: number[] = [];
      const blackIndices: number[] = [];

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

        const cx = (positions.getX(i0) + positions.getX(i1) + positions.getX(i2)) / 3;
        const cy = (positions.getY(i0) + positions.getY(i1) + positions.getY(i2)) / 3;
        const cz = (positions.getZ(i0) + positions.getZ(i1) + positions.getZ(i2)) / 3;

        const isBlack = isBlackZone(cx, cy, cz);
        (isBlack ? blackIndices : bodyIndices).push(i0, i1, i2);
      }

      // Body mesh
      if (bodyIndices.length > 0) {
        const g = geo.clone();
        g.setIndex(bodyIndices);
        g.computeVertexNormals();
        const m = new THREE.Mesh(g, bodyMat);
        m.castShadow = true;
        m.receiveShadow = true;
        result.push(m);
      }

      // Black mesh (wheels + turret + underbody)
      if (blackIndices.length > 0) {
        const g = geo.clone();
        g.setIndex(blackIndices);
        g.computeVertexNormals();
        const m = new THREE.Mesh(g, blackMat);
        m.castShadow = true;
        m.receiveShadow = true;
        result.push(m);
      }
    });

    return result;
  }, [scene, bodyMat, blackMat]);

  return (
    <group scale={1.8} position={[0, 0, 0]}>
      {parts.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}

// Model bbox: x(-0.95, 0.95), y(-0.49, 0.49), z(-0.53, 0.53)
// Camera turret sits on top center, wheels are at bottom corners
function isBlackZone(x: number, y: number, z: number): boolean {
  // Camera turret: top of model, roughly centered
  if (y > 0.30 && Math.abs(x) < 0.45 && Math.abs(z) < 0.35) return true;

  // Wheels: bottom of model at the four corners
  if (y < -0.20 && Math.abs(x) > 0.35 && Math.abs(z) > 0.25) return true;

  // Underbody: very bottom
  if (y < -0.42) return true;

  return false;
}

useGLTF.preload('/models/mower.glb');
