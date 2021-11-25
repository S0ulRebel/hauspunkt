import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Vector3 } from "three";
import { extend, useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { clamp } from "three/src/math/MathUtils";
import { ConfigContext } from "../../context/config-context";
extend({ DragControls });

interface BathroomElementProps {
  startPosition: number[];
  dimensions: any[];
  minX: number;
  maxX: number;
}

const BathroomElementMesh = ({
  startPosition,
  dimensions,
  minX,
  maxX,
}: BathroomElementProps) => {
  const groupRef = useRef<any>();
  const [configContext] = useContext(ConfigContext);
  const [controls, setControls] = useState<DragControls>();
  const [children, setChildren] = useState<any>([]);
  const { camera, gl } = useThree();
  const [position, setPosition] = useState([...startPosition]);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (groupRef.current) {
      setChildren([groupRef.current]);
    }
  }, [groupRef]);
  useEffect(() => {
    setControls(new DragControls(children, camera, gl.domElement));
  }, [children]);

  useEffect(() => {
    controls?.addEventListener("dragstart", () => setActive(true));
    controls?.addEventListener("drag", (e) => {
      const x = clamp(e.object.position.x, minX, maxX);
      const [, y, z] = [...position];
      e.object.position.x = 0;
      e.object.position.y = 0;
      e.object.position.z = 0;
      setPosition([x, y, z]);
    });
    controls?.addEventListener("dragend", (e) => {
      setActive(false);
    });
  }, [controls]);

  return (
    <group ref={groupRef} position={new Vector3(...position)}>
      <mesh>
        <planeBufferGeometry
          attach="geometry"
          args={[dimensions[0], dimensions[1]]}
        />
        <meshBasicMaterial color={active ? "green" : "red"} />
      </mesh>
    </group>
  );
};

export default BathroomElementMesh;
