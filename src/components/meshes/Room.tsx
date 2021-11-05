import React, { Suspense, useContext } from "react";
import { Vector3 } from "three";
import { ConfigContext } from "../../context/config-context";
import BathroomElement from "../../models/BathroomElement";
import { elementsMinDistance } from "../../utils/constants";
import BathroomElementMesh from "./BathroomElementMesh";
import DimensionLine from "./DimensionLine";
import LigthBulb from "./LightBulb";
import Wall from "./Wall";

interface RoomProps {
  roomPosition: Vector3;
}

const Room = ({ roomPosition }: RoomProps) => {
  const [configContext, setConfigContext] = useContext(ConfigContext);
  const { roomHeight, roomWidth, roomDepth, wallThickness, prewall, schacht } =
    configContext.room;

  const { prewallWidth, prewallHeight, prewallLeft, prewallThickness } =
    configContext.prewall;

  const { schachtWidth, schachtHeight, schachtThickness } =
    configContext.schacht;

  const getMinXForElement = (el: BathroomElement) =>
    prewallLeft - prewallWidth / 2 + el.width / 2 + elementsMinDistance;

  const getMaxnXForElement = (el: BathroomElement) =>
    prewallLeft + prewallWidth / 2 - el.width / 2 - elementsMinDistance;

  return (
    <>
      <Suspense fallback={null}>
        <group position={roomPosition}>
          <LigthBulb
            intensity={0.4}
            position={
              new Vector3(0, 0, 0)
            }
          />
          <Wall
            key="left"
            dimensions={[roomHeight + wallThickness, wallThickness, roomDepth]}
            position={[
              -roomWidth / 2 - wallThickness / 2,
              wallThickness / 2,
              0,
            ]}
            rotation={[0, 0, 0]}
          />
          <Wall
            key="right"
            dimensions={[roomHeight + wallThickness, wallThickness, roomDepth]}
            position={[roomWidth / 2 + wallThickness / 2, wallThickness / 2, 0]}
            rotation={[0, 0, 0]}
          />
          <Wall
            key="back"
            dimensions={[roomHeight, roomWidth, wallThickness]}
            position={[0, 0, -roomDepth / 2 - wallThickness / 2]}
            rotation={[0, 0, 0]}
          />
          <Wall
            key="floor"
            dimensions={[
              wallThickness,
              roomWidth + wallThickness * 2,
              roomDepth,
            ]}
            position={[0, -roomHeight / 2 - wallThickness / 2, 0]}
            rotation={[0, 0, 0]}
          />
          <Wall
            key="ceiling"
            dimensions={[wallThickness, roomWidth, roomDepth]}
            position={[0, roomHeight / 2 + wallThickness / 2, 0]}
            rotation={[0, 0, 0]}
          />
          {prewall && (
            <Wall
              key="prewall"
              dimensions={[prewallHeight, prewallWidth, prewallThickness]}
              position={[
                -roomWidth / 2 + prewallLeft + prewallWidth / 2,
                -roomHeight / 2 + prewallHeight / 2,
                -roomDepth / 2 + wallThickness + prewallThickness / 2,
              ]}
              rotation={[0, 0, 0]}
            />
          )}
          {schacht && (
            <Wall
              key="shacht"
              dimensions={[schachtHeight, schachtWidth, schachtThickness]}
              position={[
                -roomWidth / 2 + schachtWidth / 2,
                -roomHeight / 2 + schachtHeight / 2,
                -roomDepth / 2 + wallThickness + schachtThickness / 2,
              ]}
              rotation={[0, 0, 0]}
            />
          )}
          {configContext.bathroomElements.map(
            (el: BathroomElement, index: number) => (
              <BathroomElementMesh
                key={index}
                startPosition={[
                  el.x,
                  -roomHeight / 2 + prewallHeight / 2,
                  -roomDepth / 2 + wallThickness + prewallThickness + 0.01,
                ]}
                dimensions={[el.width, prewallHeight]}
                minX={getMinXForElement(el)}
                maxX={getMaxnXForElement(el)}
              />
            )
          )}
          <DimensionLine
            start={[-roomWidth / 2, -roomHeight / 2 + 0.2, -roomDepth / 4]}
            end={[roomWidth / 2, -roomHeight / 2 + 0.2, -roomDepth / 4]}
            color="#BD1B1F"
          />
          <DimensionLine
            start={[-roomWidth / 2 + 0.2, -roomHeight / 2, -roomDepth / 4]}
            end={[-roomWidth / 2 + 0.2, roomHeight / 2, -roomDepth / 4]}
            color="#BD1B1F"
            orientation="vertical"
          />
        </group>
      </Suspense>
    </>
  );
};

export default Room;
