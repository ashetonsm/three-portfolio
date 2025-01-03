import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [Math.PI * -0.5, 0, 0],
    position: [0, -2, 0]
  }));
  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={0x00ff00} />
    </mesh>
  );
}

function Box(props) {
  const [ref] = useBox(() => ({ mass: 1, ...props }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

export default function App() {

  return (
    <div className="App">
      <Canvas shadows style={{ height: '100vh' }} >
        <Physics>
          <Plane />
          <Box
            position={[0, 2, 0]}
            rotation={[Math.PI * 0.25, Math.PI * 0.25, 0]}
            color={0xff0000}
          />
          <Box
            position={[0.5, 4, 0]}
            rotation={[Math.PI * 0.25, Math.PI * 0.25, 0]}
            color={0x0000ff}
          />
        </Physics>

        <ambientLight color={0xffffff} intensity={0.1} />
        <pointLight
          color={0xffffff}
          castShadow
          shadowMapHeight={1024}
          shadowMapWidth={1024}
          position={[0, 3, 2]}
          intensity={0.5}
        />
        <OrbitControls />
        <Suspense fallback={null}>
        </Suspense>
      </Canvas>
    </div>
  );
}
