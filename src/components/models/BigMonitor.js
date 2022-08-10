import * as THREE from 'three'
import React, { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/BigMonitor.gltf");

    return (
        <group
            ref={group}
            {...props}
            dispose={null} >
            {props.name == "copy" ?
                <mesh
                    position={[-0.2, 0.6, 0]}
                    rotation={new THREE.Euler(0, 0.2, 0)}
                    scale={[0.1, 0.1, 1]} >
                    <planeGeometry />
                    <Html>
                        <h1>GitHub</h1>
                    </Html>
                </mesh>
                :
                <mesh
                    castShadow
                    geometry={nodes.Beeg_Monitor_Screen.geometry}
                    material={materials["Big Monitor"]}
                    position={[0.21, 0.5, -0.12]}
                />
            }
        </group>
    )
}

useGLTF.preload("/three-portfolio/models/BigMonitor.gltf");