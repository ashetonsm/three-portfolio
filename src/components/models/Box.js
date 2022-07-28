import * as THREE from 'three'
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Box = (props) => {

    const ref = useRef()
    const { nodes, materials } = useGLTF("/three-portfolio/models/Cube.gltf");

    return (
        <group
            ref={ref}
            {...props}
            dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials.Background}
                rotation={new THREE.Euler(0, 0, 0)}
            />
        </group>
    )
}

useGLTF.preload("/Cube.gltf");
