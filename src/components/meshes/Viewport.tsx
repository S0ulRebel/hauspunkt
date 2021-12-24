import { OrbitControls } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { start } from "repl";
import * as THREE from "three";
import { Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { mapLinear } from "three/src/math/MathUtils";
import { ConfigContext } from "../../context/config-context";
import BathroomElement from "../../models/BathroomElement";
import BathroomElementMesh from "./BathroomElementMesh";
import LigthBulb from "./LightBulb";
import Wall from "./Wall";

const Viewport = () => {
  const [configContext, setConfigContext] = useContext(ConfigContext);
  const [activeElelmentId, setActiveElementId] = useState<string>("");
  const { room } = configContext;
  const {
    hasRoomDivider,
    hasPartitionWall,
    roomHeight,
    minRoomHeight,
    roomWidth,
    minRoomWidth,
    maxRoomWidth,
    roomDepth,
    wallThickness,
    prewallWidth,
    prewallHeight,
    prewallLeft,
    prewallThickness,
    prewallDistance,
    hasSchacht,
    schachtWidth,
    schachtHeight,
    schachtLeft,
    schachtThickness,
  } = room;

  const { camera } = useThree();

  const updateCameraPosition = () => {
    const min = 0.3;
    const max = hasRoomDivider || hasPartitionWall ? 0.7 : 0.6;
    // map value of room width to min 0.4 max 0.6 or 0.7 if room has a divider or partition wall
    const factor = mapLinear(roomWidth, minRoomWidth, maxRoomWidth, min, max);
    camera.position.set(roomWidth / 2, minRoomHeight / 2, roomDepth * factor);
  };

  const deleteActiveBathroomElement = () => {
    room.deleteBathroomElement(activeElelmentId);
    updateRoomInContext();
  };

  const onDocumentKeyDown = ({ key }: KeyboardEvent) => {
    if (key === "Delete") {
      deleteActiveBathroomElement();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onDocumentKeyDown, false);
  }, [onDocumentKeyDown]);

  useThree(({ camera, size }) => {
    updateCameraPosition();
  });

  useEffect(() => {
    updateCameraPosition();
  }, [camera, roomDepth, roomHeight, roomWidth]);

  const renderWall = (
    position: number[],
    dimensions: number[],
    color: string = "#dddddd"
  ) => <Wall position={position} dimensions={dimensions} color={color} />;

  const renderHorizontalWall = (position: number[]) => {
    const dimensions = [wallThickness, roomWidth, roomDepth];
    return renderWall(position, dimensions);
  };

  const renderVerticalWall = (position: number[]) => {
    const dimensions = [roomHeight, roomWidth, wallThickness];
    return renderWall(position, dimensions);
  };

  const renderSideWall = (position: number[]) => {
    const dimensions = [roomHeight, wallThickness, roomDepth];
    return renderWall(position, dimensions);
  };

  const renderPrewall = () => {
    const dimensions = [prewallHeight, prewallWidth, prewallThickness];
    const x = prewallLeft + prewallWidth / 2;
    const y = prewallHeight / 2;
    const z = prewallThickness / 2 + prewallDistance;
    const position = [x, y, z];
    return renderWall(position, dimensions, "#bbbbbb");
  };

  const renderSchacht = () => {
    const dimensions = [roomHeight, schachtWidth, schachtThickness];
    const x = schachtLeft + schachtWidth / 2;
    const y = roomHeight / 2;
    const z = prewallThickness / 2;
    const position = [x, y, z];
    return renderWall(position, dimensions, "#bbbbbb");
  };

  const renderLighting = () => {
    const lightPositions = [new Vector3(roomWidth / 2, 120, roomDepth / 2)];
    const lightIntensity = 1;
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

  const getDimensionLinesForElementIndex = (index: number) => {
    const { bathroomElements: elements } = configContext;
    const lineY = -140;
    const element = elements[index];
    const elementDimensionLine = {
      start: [-element.width / 2, lineY],
      end: [element.width / 2, lineY],
    };

    const previousElement = index > 0 ? elements[index - 1] : null;
    const left = previousElement
      ? element.x - (previousElement.x + element.width)
      : element.x;
    const leftDimensionLine = {
      start: [-element.width / 2 - left, lineY],
      end: [-element.width / 2, lineY],
      labelOffset: 10,
    };

    const nextElement = index < elements.length ? elements[index + 1] : null;
    const right = nextElement ? nextElement.x : prewallLeft + prewallWidth;
    const rightDimensionLine = {
      start: [element.width / 2, lineY],
      end: [right - element.x - element.width / 2, lineY],
      labelOffset: -10,
    };

    return [leftDimensionLine, rightDimensionLine];
  };

  const updateRoomInContext = () => {
    setConfigContext({
      ...configContext,
      ...JSON.parse(JSON.stringify(room)),
    });
  };

  const elementDragHandler = (id: string, value: number) => {
    const element = room.bathroomElements.find(
      (el: BathroomElement) => el.id === id
    );
    if (element) {
      element.setX(value);
      room.calculateMinMaxXForAllElements();
      updateRoomInContext();
    }
  };

  return (
    <>
      {/* <OrbitControls /> */}
      <axesHelper args={[100]} />
      <gridHelper scale={new Vector3(200, 200, 200)} />
      <ambientLight intensity={0.2} />
      {renderLighting()}
      {renderHorizontalWall([roomWidth / 2, 0, roomDepth / 2])}
      {renderHorizontalWall([roomWidth / 2, roomHeight, roomDepth / 2])}
      {renderVerticalWall([roomWidth / 2, roomHeight / 2, 0])}
      {renderSideWall([0, roomHeight / 2, roomDepth / 2])}
      {renderSideWall([roomWidth, roomHeight / 2, roomDepth / 2])}
      {renderPrewall()}
      {hasSchacht && renderSchacht()}
      {configContext.bathroomElements.map(
        (el: BathroomElement, index: number) => (
          <BathroomElementMesh
            key={el.id}
            id={el.id}
            type={el.type}
            startPosition={[
              el.x + el.width / 2,
              prewallHeight / 2,
              prewallDistance + prewallThickness + 0.1,
            ]}
            dimensions={[el.width, prewallHeight]}
            dimensionLines={getDimensionLinesForElementIndex(index)}
            active={activeElelmentId === el.id}
            dragHandler={(value: number) => elementDragHandler(el.id, value)}
            clickHandler={(id: string) => {
              setActiveElementId(id);
            }}
            deleteHandler={() => deleteActiveBathroomElement()}
          />
        )
      )}
    </>
  );
};

export default Viewport;
