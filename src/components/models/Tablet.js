import * as THREE from 'three'
import React, { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/Tablet.gltf");

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>

            {props.name == "copy" ?
                <mesh
                    position={[0.2, 0.6, 0]}
                    scale={[0.1, 0.1, 1]} >
                    <planeGeometry />
                    <Html>
                        <h1>ArtStation</h1>
                    </Html>
                </mesh>
                :
                <mesh
                    castShadow
                    geometry={nodes.Tablet.geometry}
                    material={materials.Tablet}
                    position={[0.38, 0.41, 0.01]}
                />
            }
        </group>
    )

}

useGLTF.preload("/three-portfolio/models/Tablet.gltf");