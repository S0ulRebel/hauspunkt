import React, { useContext, useEffect, useRef } from "react";
import { Plane } from "@react-three/drei";
import { useState } from "react";
import { Vector3 } from "three";
import { extend, ThreeEvent, useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { group } from "console";
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
  const {room} = useContext(ConfigContext);
  // const controlsRef = useRef();
  const [controls, setControls] = useState<DragControls>();
  const [children, setChildren] = useState([]);
  const { camera, gl } = useThree();
  const [position, setPosition] = useState([...startPosition]);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (groupRef.current) {
      setChildren(groupRef.current.children);
    }
  }, [groupRef]);
  useEffect(() => {
    setControls(new DragControls(children, camera, gl.domElement));
  }, [children]);

  useEffect(() => {
    controls?.addEventListener("dragstart", () => setActive(true));
    controls?.addEventListener("drag", (e) => {
      // const [x, y, z] = startPosition;
      console.log(e, startPosition);
      const width = dimensions[0];
      const newX = clamp(e.object.position.x, minX, maxX);
      // const x = newX;
      // const y = e.object.parent.position.y;
      // const z = e.object.parent.position.z;
      e.object.position.x = newX;
      e.object.position.y = e.object.parent.position.y;
      e.object.position.z = e.object.parent.position.z;
      const { x, y, z } = e.object.position;
      e.object.position.x = 0;
      e.object.position.y = 0;
      e.object.position.z = 0;
      setPosition([x, y, z]);
    });
    controls?.addEventListener("dragend", (e) => {
      setActive(false);
      // e.object.position.x = e.object.parent.position.x;
      // e.object.position.x = e.object.parent.position.y;
      // e.object.position.x = e.object.parent.position.z;
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
