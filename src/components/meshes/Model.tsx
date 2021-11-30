import { useLoader, Vector3 } from "@react-three/fiber";
import { Scanline } from "@react-three/postprocessing";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { degToRad } from "three/src/math/MathUtils";

interface ModelProps {
  path: string;
  scale: number[];
  x?: number;
  y?: number;
  z?: number;
  rotation?: {
    x: number;
    y: number;
    z: number;
  } | null;
}

const Model = ({
  path,
  scale,
  x = 0,
  y = 0,
  z = 0,
  rotation
}: ModelProps) => {
  const model = useLoader(GLTFLoader, path);
  if(rotation) model.scene.rotation.set(
    degToRad(rotation.x),
    degToRad(-90),
    degToRad(rotation.z)
  );
  model.scene.position.setX(x);
  model.scene.position.setZ(z);
  model.scene.position.setY(y);
  console.log(model);
  return <primitive object={model.scene} scale={scale} />;
};

export default Model;
