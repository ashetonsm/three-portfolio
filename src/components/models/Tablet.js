import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/Tablet.gltf");

    return (
        <Select>

            <group
                ref={group}
                {...props}
                dispose={null}>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Tablet.geometry}
                    material={materials.Tablet}
                    position={[0.38, 0.41, 0.01]}
                />
            </group>
        </Select>
    )

}

useGLTF.preload("/Tablet.gltf");