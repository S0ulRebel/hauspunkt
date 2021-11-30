import React, { Suspense, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Vector3 } from "three";
import { extend, useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { clamp } from "three/src/math/MathUtils";
import { ConfigContext } from "../../context/config-context";
import Model from "./Model";
import { BathroomElementType } from "../../models/BathroomElement";
extend({ DragControls });

interface BathroomElementProps {
  type: BathroomElementType;
  startPosition: number[];
  dimensions: any[];
  minX: number;
  maxX: number;
}

const BathroomElementMesh = ({
  type,
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
        <meshBasicMaterial
          color={active ? "#BD1B1F" : "#BD1B1F"}
          opacity={0.1}
          transparent={true}
        />
      </mesh>
      <Suspense fallback={''}>
        {type === 'toilet' && <Model path="/models/toilet.gltf" scale={new Array(3).fill(2)} y={-dimensions[1] / 2 + 10} z={35} />}
        {type === 'urinal' && <Model path="/models/urinal.gltf" scale={new Array(3).fill(40)} y={-dimensions[1] / 2 + 30} z={8} /> }
        {type === 'sink' && <Model path="/models/sink.gltf" scale={new Array(3).fill(0.8)} y={-dimensions[1] / 2 + 60} z={20} rotation={{x: 0, y: -90, z: 0}}/>}
      </Suspense>
    </group>
  );
};

export default BathroomElementMesh;
