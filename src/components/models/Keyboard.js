import * as THREE from 'three'
import React, { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/Keyboard.gltf");

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>

            {props.name == "copy" ?
                <mesh
                    position={[0.07, 0.6, 0]}
                    scale={[0.1, 0.1, 1]} >
                    <planeGeometry />
                    <Html>
                        <h1>Itch.io</h1>
                    </Html>
                </mesh>
                :
                <mesh
                    castShadow
                    geometry={nodes.Keys.geometry}
                    material={materials.Keyboard}
                    position={[-0.14, 0.4, 0.12]}
                />
            }


        </group>
    )
}

useGLTF.preload("/three-portfolio/models/Keyboard.gltf");
