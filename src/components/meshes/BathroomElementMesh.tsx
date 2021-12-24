import React, { Suspense, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Vector3 } from "three";
import { extend, useThree } from "@react-three/fiber";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { ConfigContext } from "../../context/config-context";
import { BathroomElementType } from "../../models/BathroomElement";
import Toilet from "./Toilet";
import Sink from "./Sink";
import Urinal from "./Urinal";
import Bidet from "./Bidet";
import DimensionLine from "./DimensionLine";
import DeleteButton from "./DeleteButton";
extend({ DragControls });

interface BathroomElementProps {
  id: string;
  type: BathroomElementType;
  startPosition: number[];
  dimensions: any[];
  dimensionLines: {
    start: number[];
    end: number[];
    labelOffset: number;
  }[];
  active: boolean;
  dragHandler: (value: number) => void;
  clickHandler: (id: string) => void;
  deleteHandler: () => void;
}

const BathroomElementMesh = ({
  id,
  type,
  startPosition,
  dimensions,
  dimensionLines,
  active,
  dragHandler,
  clickHandler,
  deleteHandler,
}: BathroomElementProps) => {
  const groupRef = useRef<any>();
  const [configContext] = useContext(ConfigContext);
  const [controls, setControls] = useState<DragControls>();
  const [children, setChildren] = useState<any>([]);
  const { camera, gl } = useThree();
  const [position, setPosition] = useState([...startPosition]);
  // const [active, setActive] = useState<boolean>(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (groupRef.current) {
      setChildren([groupRef.current]);
    }
  }, [groupRef]);
  useEffect(() => {
    setControls(new DragControls(children, camera, gl.domElement));
  }, [children]);

  useEffect(() => {
    controls?.addEventListener("drag", (e) => {
      const width = dimensions[0];
      const newX = startPosition[0] + e.object.position.x;
      e.object.position.x = 0;
      e.object.position.y = 0;
      e.object.position.z = 0;
      dragHandler(newX - width / 2);
    });
  }, [controls]);

  return (
    <group ref={groupRef} position={new Vector3(...startPosition)}>
      {active &&
        dimensionLines.map((line, index) => (
          <DimensionLine
            key={index}
            start={[...line.start, 0]}
            end={[...line.end, 0]}
            orientation="horizontal"
            labelOffset={line.labelOffset}
            color="#BD1B1F"
          />
        ))}
      <mesh
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onPointerDown={() => clickHandler(id)}
        onPointerMissed={() => clickHandler("")}
      >
        <planeBufferGeometry
          attach="geometry"
          args={[dimensions[0], dimensions[1]]}
        />
        <meshBasicMaterial
          color={"#BD1B1F"}
          opacity={active ? 0.2 : hover ? 0.1 : 0}
          transparent={true}
        />
        {active && <DeleteButton clickHandler={() => deleteHandler()} />}
      </mesh>
      <Suspense fallback={""}>
        {type === "toilet" && (
          <Toilet
            scale={new Vector3(...new Array(3).fill(80))}
            position={new Vector3(0, -dimensions[1] / 2 + 40, 15)}
          />
        )}
        {type === "sink" && (
          <Sink
            scale={new Vector3(...new Array(3).fill(50))}
            position={new Vector3(0, -dimensions[1] / 2 + 70, 10)}
          />
        )}
        {type === "urinal" && (
          <Urinal
            scale={new Vector3(...new Array(3).fill(70))}
            position={new Vector3(0, -dimensions[1] / 2 + 50, 10)}
          />
        )}
        {type === "bidet" && (
          <Bidet
            scale={new Vector3(...new Array(3).fill(80))}
            position={
              new Vector3(-dimensions[0] / 4, -dimensions[1] / 2 + 5, 35)
            }
          />
        )}
      </Suspense>
    </group>
  );
};

export default BathroomElementMesh;
