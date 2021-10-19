import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, MeshProps, useThree } from "@react-three/fiber";
import { GlobalStyles } from "@mui/material";
import { FunctionComponent, useState } from "react";
import * as THREE from "three";

const Camera: FunctionComponent = () => {
  useThree((three) => {
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);

    ambientLight.castShadow = true;
    three.camera.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);

    directionalLight.castShadow = true;
    three.camera.add(directionalLight);
  });

  return <PerspectiveCamera makeDefault position={[32, 32, 32]} />;
};

const Voxel: FunctionComponent<MeshProps> = (props) => {
  const [hovered, setHover] = useState(false);

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? "#ff00ff" : "#ffff00"} />
    </mesh>
  );
};

export const App: FunctionComponent = () => {
  return (
    <>
      <GlobalStyles
        styles={{
          "body, html, #app": {
            height: "100%",
          },
        }}
      />

      <Canvas shadows>
        <OrbitControls enableRotate enableZoom />
        <Camera />

        {[...Array(16).keys()].flatMap((z) => {
          return [...Array(16).keys()].flatMap((y) => {
            return [...Array(16).keys()].map((x) => {
              return (
                Math.random() < 0.25 && (
                  <Voxel position={[x - 8, y - 8, z - 8]} />
                )
              );
            });
          });
        })}
      </Canvas>
    </>
  );
};
