import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/Tablet.gltf");

    return (
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
    )

}

useGLTF.preload("/Tablet.gltf");