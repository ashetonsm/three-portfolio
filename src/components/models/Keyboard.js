import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/Keyboard.gltf");

    return (
        <Select>
            <group
                ref={group}
                {...props}
                dispose={null}>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Keyboard.geometry}
                    material={materials.Keyboard}
                    position={[-0.14, 0.4, 0.12]}
                />
            </group>
        </Select>
    );
}

useGLTF.preload("/Keyboard.gltf");
