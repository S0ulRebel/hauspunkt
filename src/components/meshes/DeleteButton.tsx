import React, { Suspense, useMemo } from "react";
import { useLoader } from "react-three-fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import deleteIcon from "./../../assets/icons/delete.svg";
import {
  BufferGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  ShapeBufferGeometry,
  Vector3,
} from "three";

interface DeleteButtonProps {
  clickHandler: () => void;
}

const DeleteButton = ({ clickHandler }: DeleteButtonProps) => {
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

  const renderIcon = shapes.map((props, index) => {
    const geometry = new ShapeBufferGeometry(props.shape);
    const edges = new EdgesGeometry(geometry);
    const material = new LineBasicMaterial({ color: "#BD1B1F" });
    return { edges, material };
  });

  return (
    <Suspense fallback={null}>
      <group
        onClick={() => clickHandler()}
        position={new Vector3(14, 0, 0)}
        rotation={[0, 0, Math.PI]}
        scale={[1, 1, 1]}
      >
        {shapes.map((props, index) => (
          <mesh>
            <meshBasicMaterial
              color="white"
              transparent={true}
              opacity={0.3}
            />
            <shapeBufferGeometry attach="geometry" args={[props.shape]} />
          </mesh>
        ))}
        {renderIcon.map(({ edges, material }, index) => (
          <lineSegments key={index} geometry={edges} material={material} />
        ))}
      </group>
    </Suspense>
  );
};

export default DeleteButton;
