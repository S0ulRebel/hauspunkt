import React, { Suspense, useMemo } from "react";
import { useLoader } from "react-three-fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import deleteIcon from "./../../assets/icons/delete.svg";
import {
  EdgesGeometry,
  LineBasicMaterial,
  ShapeBufferGeometry,
  Vector3,
} from "three";

interface DeleteButtonProps {
  clickHandler: () => void;
  position: number[],
}

const DeleteButton = ({ clickHandler, position }: DeleteButtonProps) => {
  const { paths } = useLoader(SVGLoader, deleteIcon);
  const shapes = useMemo(
    () =>
      paths.flatMap((path, index) =>
        path
          .toShapes(true)
          .map((shape) => ({ index, shape, color: path.color }))
      ),
    [paths]
  );

  const outlines = shapes.map((props, index) => {
    const geometry = new ShapeBufferGeometry(props.shape);
    const edges = new EdgesGeometry(geometry);
    const material = new LineBasicMaterial({ color: "#BD1B1F" });
    return { edges, material };
  });
  
  return (
    <Suspense fallback={null}>
      <group
        onClick={() => clickHandler()}
        position={new Vector3(...position)}
        rotation={[0, 0, Math.PI]}
        scale={[1, 1, 1]}
      >
        {shapes.map((props, index) => (
          <mesh key={index}>
            <meshBasicMaterial color="white" transparent={true} opacity={0.3} />
            <shapeBufferGeometry attach="geometry" args={[props.shape]} />
          </mesh>
        ))}
        {outlines.map(({ edges, material }, index) => (
          <lineSegments key={index} geometry={edges} material={material} />
        ))}
      </group>
    </Suspense>
  );
};

export default DeleteButton;
