import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useContext, useEffect } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import { ConfigContext } from "../../context/config-context";
import BathroomElement from "../../models/BathroomElement";
import { elementsMinDistance } from "../../utils/constants";
import BathroomElementMesh from "./BathroomElementMesh";
import LigthBulb from "./LightBulb";
import Wall from "./Wall";

const Viewport = () => {
  const [configContext] = useContext(ConfigContext);
  const { room, prewall } = configContext;
  const {
    roomHeight,
    minRoomHeight,
    roomWidth,
    minRoomWidth,
    roomDepth,
    wallThickness,
  } = room;
  const { prewallWidth, prewallLeft, prewallThickness } = prewall;

  const { camera } = useThree();

  const roomPosition = new Vector3(roomWidth / 2, 0, roomDepth / 2);

  const updateCameraPosition = () => {
    const z = roomWidth <= minRoomWidth ? roomWidth : roomWidth / 2;
    camera.position.set(roomWidth / 2, -roomHeight / 4, z);
    camera.lookAt(
      new THREE.Vector3(roomWidth / 2, -minRoomHeight / 2, -roomDepth)
    );
    camera.updateProjectionMatrix();
  };

  useThree(({ camera, size }) => {
    updateCameraPosition();
  });

  useEffect(() => {
    updateCameraPosition();
  }, [camera, roomDepth, roomHeight, roomWidth]);

  const renferFloor = () => {
    const width = roomWidth;
    const height = wallThickness;
    const depth = roomDepth;
    const dimensions = [height, width, depth];
    let { x, y, z } = roomPosition;
    y -= roomHeight / 2 + wallThickness / 2;
    const position = [x, y, z];
    return <Wall position={position} dimensions={dimensions} />;
  };

  const renderCeiling = () => {
    const width = roomWidth;
    const height = wallThickness;
    const depth = roomDepth;
    const dimensions = [height, width, depth];
    let { x, y, z } = roomPosition;
    y += roomHeight / 2 + wallThickness / 2;
    const position = [x, y, z];
    return <Wall position={position} dimensions={dimensions} />;
  };

  const renderBackWall = () => {
    const width = roomWidth;
    const height = roomHeight;
    const depth = wallThickness;
    const dimensions = [height, width, depth];
    let { x, y, z } = roomPosition;
    z -= roomDepth / 2;
    const position = [x, y, z];
    return <Wall position={position} dimensions={dimensions} />;
  };

  const renderLeftWall = () => {
    const width = wallThickness;
    const height = roomHeight;
    const depth = roomDepth;
    const dimensions = [height, width, depth];
    let { x, y, z } = roomPosition;
    x -= roomWidth / 2 + wallThickness / 2;
    const position = [x, y, z];
    return <Wall position={position} dimensions={dimensions} />;
  };

  const renderRightWall = () => {
    const width = wallThickness;
    const height = roomHeight;
    const depth = roomDepth;
    const dimensions = [height, width, depth];
    let { x, y, z } = roomPosition;
    x += roomWidth / 2 + wallThickness / 2;
    const position = [x, y, z];
    return <Wall position={position} dimensions={dimensions} />;
  };

  const renderPrewall = () => {
    const {
      prewallHeight: height,
      prewallWidth: width,
      prewallThickness: depth,
    } = prewall;
    const dimensions = [height, width, depth];
    let { x, y, z } = roomPosition;
    z -= roomDepth / 2 - prewallThickness / 2;
    y = -roomHeight / 2 + prewall.prewallHeight / 2;
    x += prewallLeft;
    const position = [x, y, z];
    return (
      <Wall position={position} dimensions={dimensions} color={"#aaaaaa"} />
    );
  };

  const renderLighting = () => {
    const lightPositions = [];

    const numX = roomWidth / (minRoomWidth / 2);
    for (let xIndex = 0; xIndex < numX; xIndex++) {
      const division = numX > 2 ? minRoomWidth / 2 : minRoomWidth;
      const x = division * xIndex;
      lightPositions.push(new Vector3(x, 0, 0));
      lightPositions.push(new Vector3(x, 0, roomDepth / 4));
    }

    const lightIntensity = numX > 3 ? 0.2 : 0.8;

    return (
      <>
        {lightPositions.map((lightPosition) => (
          <LigthBulb
            position={lightPosition}
            intensity={lightIntensity}
            showBulb={false}
          />
        ))}
      </>
    );
  };

  const getMinXForElement = (el: BathroomElement) =>
    elementsMinDistance + el.width / 2;

  const getMaxnXForElement = (el: BathroomElement) =>
    prewallLeft + prewallWidth - el.width / 2 - elementsMinDistance;

  return (
    <>
      {/* <OrbitControls /> */}
      {/* <axesHelper args={[100]} /> */}
      {/* <gridHelper scale={new Vector3(100, 100, 100)} /> */}
      <ambientLight intensity={0.2} />
      {renderLighting()}
      {renferFloor()}
      {renderCeiling()}
      {renderBackWall()}
      {renderLeftWall()}
      {renderRightWall()}
      {/* {renderPrewall()} */}
      {configContext.bathroomElements.map(
        (el: BathroomElement, index: number) => (
          <BathroomElementMesh
            key={index}
            startPosition={[
              el.x,
              -(roomHeight / 2 - prewall.prewallHeight / 2),
              prewallThickness + 0.1,
            ]}
            dimensions={[el.width, prewall.prewallHeight]}
            minX={getMinXForElement(el)}
            maxX={getMaxnXForElement(el)}
          />
        )
      )}
    </>
  );
};

export default Viewport;
