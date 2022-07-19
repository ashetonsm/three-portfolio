import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("models/SmallMonitor.gltf");

    return (
        <Select>

            <group
                ref={group}
                {...props}
                dispose={null}>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Small_Monitor_Screen.geometry}
                    material={materials["Small Monitor"]}
                    position={[-0.31, 0.51, -0.07]}
                />
            </group>
        </Select>
    )
}

useGLTF.preload("/SmallMonitor.gltf");