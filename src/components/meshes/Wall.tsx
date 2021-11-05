import React from "react";
import { Euler, Vector3 } from "three";

interface WallProps {
  dimensions: number[];
  position: number[];
  rotation: number[];
  color?: string;
}

const Wall = ({
  dimensions = [1, 1, 1],
  position,
  rotation,
  color = "#dddddd",
}: WallProps) => {
  const [width, height, depth] = dimensions;

  return (
    <mesh
      position={new Vector3(...position)}
      rotation={new Euler(...rotation)}
      castShadow={true}
      receiveShadow={true}
    >
      <boxBufferGeometry
        attach="geometry"
        args={[height, width, depth, 10, 10, 10]}
      />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

export default Wall;
