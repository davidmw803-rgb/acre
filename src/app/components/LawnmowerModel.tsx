import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface LawnmowerModelProps {
  color: string;
}

export function LawnmowerModel({ color }: LawnmowerModelProps) {
  const { scene } = useGLTF('/models/mower.glb');

  const material = useMemo(
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

  // Update color reactively
  useEffect(() => {
    material.color.set(color);
    material.needsUpdate = true;
  }, [color, material]);

  // Apply material to all meshes + compute normals
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }
      }
    });
  }, [scene, material]);

  return (
    <primitive object={scene} scale={1.8} position={[0, 0, 0]} />
  );
}

useGLTF.preload('/models/mower.glb');
