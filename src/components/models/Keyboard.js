import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/Keyboard.gltf");

    return (
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
    )
}

useGLTF.preload("/Keyboard.gltf");
