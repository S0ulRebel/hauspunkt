import { Canvas, context } from "@react-three/fiber";
import { useContext, useEffect, useState } from "react";
import { useThree } from "react-three-fiber";
import { Camera } from "three";
import * as THREE from "three";
import Scene from "../../components/meshes/Scene";
import DimensionsInputGroup from "../../components/ui/dimensions-input-group/DimensionsInputGroup";
import "./RoomView.scss";
import { ConfigContext } from "../../context/config-context";
import BathroomElement from "../../models/BathroomElement";
import { elementsMinDistance, elementWidth } from "../../utils/constants";

const RoomView = () => {
  const [configContext, setConfigContext] = useContext(ConfigContext);
  const { room, prewall, schacht } = configContext;

  const {
    roomWidth,
    roomHeight,
    minRoomWidth,
    maxRoomWidth,
    minRoomHeight,
    maxRoomHeight,
    roomDepth,
  } = room;
  const {
    prewallWidth,
    minPrewallWidth,
    minPrewallHeight,
    prewallHeight,
    prewallThickness,
    prewallLeft,
    prewallRight,
  } = prewall;

  const roomlWidthHandler = (v: number) => {
    console.log('roomlWidthHandler', v)
    setConfigContext({
      ...configContext,
      room: {
        ...room,
        roomWidth: v,
      },
    });
    // setRoomWidth(v);
    // if (prewallWidth > v) setPrewallWidth(v);
  };

  const roomlHeightHandler = (v: number) => {
    console.log(v);
    const newPrewallHeight = prewallHeight > v ? v : prewallHeight;
    setConfigContext({
      ...configContext,
      room: {
        ...room,
        roomHeight: v,
      },
      prewall: {
        ...prewall,
        prewallHeight: newPrewallHeight,
      }
    });
  };

  const prewallWidthHandler = (v: number) => {
    setConfigContext({
      ...configContext,
      prewall: {
        ...prewall,
        prewallWidth: v,
      },
    });
    // setPrewallWidth(v);
  };

  const prewallHeightHandler = (v: number) => {
    setConfigContext({
      ...configContext,
      prewall: {
        ...prewall,
        prewallHeight: v,
      },
    });
    // setPrewallHeight(v);
  };

  const prewallLeftHandler = (v: number) => {
    setConfigContext({
      ...configContext,
      prewall: {
        ...prewall,
        prewallLeft: v,
      },
    });
    // setPrewallLeft(v);
    // if (prewallLeft + prewallWidth > roomWidth) {
    //   const newWidth = (roomWidth * 100 - prewallLeft * 100) / 100.0;
    //   setPrewallWidth(newWidth);
    // }
  };

  const prewallRightHandler = (v: number) => {
    setConfigContext({
      ...configContext,
      prewall: {
        ...prewall,
        prewallRight: v,
      },
    });
    // setPrewallRight(v);
  };

  const getStartXForNewElement = () => {
    return prewallLeft - prewallWidth / 2 + elementWidth / 2 + elementsMinDistance;
  };

  const addBathroomElement = (type: string) => {
    const newElement = new BathroomElement(type, elementWidth, getStartXForNewElement());
    setConfigContext({
      ...configContext,
      bathroomElements: [...configContext.bathroomElements, newElement],
    });
  };

  return (
    <div className="room-view">
      <div className="controls-wrapper">
        <DimensionsInputGroup
          label={"Room width:"}
          value={room.roomWidth}
          min={room.minRoomWidth}
          max={room.maxRoomWidth}
          handler={(v) => roomlWidthHandler(v)}
        />
        <DimensionsInputGroup
          label={"Room height:"}
          value={room.roomHeight}
          min={room.minRoomHeight}
          max={room.maxRoomHeight}
          handler={(v) => roomlHeightHandler(v)}
        />
        <DimensionsInputGroup
          label={"Prewall height:"}
          value={prewall.prewallHeight}
          min={prewall.minPreWallHeight}
          max={room.roomHeight}
          handler={(v) => prewallHeightHandler(v)}
        />
        <DimensionsInputGroup
          label={"Prewall width:"}
          value={prewallWidth}
          min={minPrewallWidth}
          max={roomWidth}
          handler={(v) => prewallWidthHandler(v)}
        />
        <DimensionsInputGroup
          label={"Prewall left:"}
          value={prewallLeft}
          min={0}
          max={roomWidth - prewallWidth / 2}
          handler={(v) => prewallLeftHandler(v)}
        />
        <DimensionsInputGroup
          label={"Prewall right:"}
          value={prewallRight}
          min={0}
          max={roomWidth - prewallWidth / 2}
          handler={(v) => prewallRightHandler(v)}
        />
        {/* <button onClick={() => addBathroomElement('toilet')}>Add element</button> */}
      </div>
      <div className="viewport-wrapper">
        {/* <Canvas shadows style={{ background: "white" }}>
          <ConfigContext.Provider value={[configContext, setConfigContext]}>
            <Scene />
          </ConfigContext.Provider>
        </Canvas> */}
      </div>
    </div>
  );
};

export default RoomView;
