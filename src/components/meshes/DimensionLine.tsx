import { Html, Line, Plane, Text } from "@react-three/drei";
import React, { useRef } from "react";
import { Euler, MeshBasicMaterial, Triangle, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";

interface DimensionLineProps {
  start: number[];
  end: number[];
  color: string;
  orientation?: "horizontal" | "vertical";
  changeHandler?: () => any | void;
}

const DimensionLine = ({
  start,
  end,
  color,
  orientation = "horizontal",
  changeHandler = () => null,
}: DimensionLineProps) => {
  const htmlRef = useRef<any>();
  const arrowLength = 0.05;
  const lineWidth = 0.5;

  const createDistanceLabel = (a: number[], b: number[]) => {
    const v1 = new Vector3(...a);
    const v2 = new Vector3(...b);
    const distance = v1.distanceTo(v2);
    const position = v1.add(v2.sub(v1).divideScalar(2));
    const bgPosition = new Vector3()
      .copy(position)
      .add(new Vector3(0, 0, 0.01));
    const textPosition = new Vector3()
      .copy(position)
      .add(new Vector3(0, 0, 0.02));

    return (
      <>
        <Plane
          castShadow={false}
          receiveShadow={false}
          position={bgPosition}
          args={[0.4, 0.15]}
          material={
            new MeshBasicMaterial({ color: "#ffffff", toneMapped: false })
          }
          onClick={() => (htmlRef.current.style.visibility = "visible")}
        />
        <Text
          position={textPosition}
          color="#332C2B"
          anchorX="center"
          anchorY="middle"
        >
          {Math.ceil(distance * 100) + " cm"}
        </Text>
        <Html
          as="div"
          center
          ref={htmlRef}
          style={{ visibility: "hidden", border: "none", outline: "none" }}
        >
          <input
            type="number"
            value={Math.ceil(distance * 100)}
            style={{ border: "none", outline: "none", width: "100px" }}
            onBlur={() => (htmlRef.current.style.visibility = "hidden")}
          />
        </Html>
      </>
    );
  };

  const getArrowPoint = (
    position: Vector3,
    length: number,
    directionX: -1 | 1,
    directionY: -1 | 1
  ) => {
    const { x, y, z } = position;
    const newX = x + length * directionX;
    const newY = y + length * directionY;
    return new Vector3(newX, newY, z);
  };

  const createArrow = (
    a: Vector3,
    b: Vector3,
    c: Vector3,
    position: Vector3,
    rotation: number,
  ) => {
    return (
      <mesh
        position={position}
        scale={[arrowLength, arrowLength, 1]}
        rotation={new Euler(0, 0, degToRad(rotation))}
      >
        <shapeGeometry>
          <vector3 args={[a.x - position.x, a.y, a.z]} />
          <vector3 args={[b.x, b.y, b.z]} />
          <vector3 args={[c.x, c.y, c.z]} />
        </shapeGeometry>
        <meshBasicMaterial color={color} attach="material" />
      </mesh>
    );
  };

  const createLeftArrow = () => {
    const position = new Vector3(...start);
    position.setX(position.x + arrowLength / 2);
    const a = new Vector3(0, 0, start[2]);
    const b = getArrowPoint(a, arrowLength, 1, 1);
    const c = getArrowPoint(a, arrowLength, 1, -1);
    return <>{createArrow(a, b, c, position, 90)}</>;
  };

  const createRightArrow = () => {
    const position = new Vector3(...end);
    position.setX(position.x - arrowLength / 2);
    const a = new Vector3(0, 0, end[2]);
    const b = getArrowPoint(a, arrowLength, -1, 1);
    const c = getArrowPoint(a, arrowLength, -1, -1);
    return <>{createArrow(a, b, c, position, -90)}</>;
  };

  const createTopArrow = () => {
    const position = new Vector3(...end);
    position.setY(position.y - arrowLength / 2);
    const a = new Vector3(0, 0, end[2]);
    const b = getArrowPoint(a, arrowLength, 1, -1);
    const c = getArrowPoint(a, arrowLength, -1, -1);
    return <>{createArrow(a, b, c, position, 0)}</>;
  };

  const createBottomArrow = () => {
    const position = new Vector3(...start);
    position.setY(position.y + arrowLength / 2);
    const a = new Vector3(0, 0, start[2]);
    const b = getArrowPoint(a, arrowLength, 1, -1);
    const c = getArrowPoint(a, arrowLength, -1, -1);
    return <>{createArrow(a, b, c, position, 180)}</>;
  };

  const createArrows = () => {
    return orientation === "horizontal" ? (
      <>
        {createLeftArrow()}
        {createRightArrow()}
      </>
    ) : (
      <>
        {createTopArrow()}
        {createBottomArrow()}
      </>
    );
  };

  return (
    <>
      <Line
        points={[new Vector3(...start), new Vector3(...end)]}
        color={color}
        lineWidth={lineWidth}
        dashed={false}
      />

      {createArrows()}
      {createDistanceLabel(start, end)}
    </>
  );
};

export default DimensionLine;
