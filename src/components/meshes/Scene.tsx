import React, { useContext, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "./Room";
import * as THREE from "three";
import { Vector3 } from "three";
import LigthBulb from "./LightBulb";
import { ConfigContext } from "../../context/config-context";

const Scene = () => {
  const [configContext, setConfigContext] = useContext(ConfigContext);
  const { roomHeight, minRoomHeight, roomWidth, roomDepth } = configContext.room;
  const { prewallWidth, prewallHeight, prewallLeft } = configContext.prewall;

  const wallThickness = 0.05;

  const { camera, controls } = useThree();

  useThree(({ camera, size }) => {
    camera.position.set(roomWidth / 2, minRoomHeight * 0.6, roomDepth);
    camera.lookAt(new THREE.Vector3(roomWidth / 2, minRoomHeight / 2, 0));
  });

  useEffect(() => {
    camera.position.set(roomWidth / 2, minRoomHeight * 0.6, roomDepth);
    camera.lookAt(new THREE.Vector3(roomWidth / 2, minRoomHeight / 2, 0));
  }, [camera, roomDepth, roomHeight, roomWidth]);

  return (
    <>
      {/* <OrbitControls /> */}
      <axesHelper args={[5]} />
      <gridHelper /> 
      <ambientLight intensity={0.01} />
      <Room
        roomPosition={new Vector3(roomWidth / 2, roomHeight / 2, roomDepth / 2)}
      />
    </>
  );
};

export default Scene;
