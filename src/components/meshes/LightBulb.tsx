import React from "react";
import { Color, Vector3 } from "three";

interface LightBulbProps {
  position: Vector3;
  intensity?: number;
  showBulb?: boolean;
}

const LigthBulb = ({ position, intensity = 1, showBulb = false }: LightBulbProps) => {
  return (
    <>
      <mesh position={position}>
        {showBulb && (
          <>
            <sphereBufferGeometry args={[0.1]} />
            <meshPhongMaterial emissive={new Color(255, 10, 10)} />
          </>
        )}
        <pointLight castShadow intensity={intensity}/>
      </mesh>
    </>
  );
};

export default LigthBulb;
