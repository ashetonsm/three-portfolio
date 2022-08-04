import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {
    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/Mouse.gltf");

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>

            <mesh
                castShadow
                geometry={nodes.Mouse.geometry}
                material={materials.Accessories}
                position={[0.31, 0.39, 0.12]}
            />
        </group>
    )
}

useGLTF.preload("/three-portfolio/models/Mouse.gltf");
