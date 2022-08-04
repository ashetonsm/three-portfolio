import * as THREE from 'three'
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";


export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/SmallMonitor.gltf");

    return (
        <group
            ref={group}
            {...props}
            dispose={null}
        >
            <mesh
                castShadow
                geometry={nodes.Small_Monitor_Screen.geometry}
                material={materials["Small Monitor"]}
                position={[-0.31, 0.51, -0.07]}
                rotation={new THREE.Euler(0, 0.2, 0)}
            />
        </group>
    )
}

useGLTF.preload("/three-portfolio/models/SmallMonitor.gltf");