import * as THREE from 'three'
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model({ ...props }) {

    const group = useRef()
    const { nodes, materials } = useGLTF("/three-portfolio/models/Tablet.gltf")

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>
            <mesh
                name="Tablet"
                linkText={props.linkText}
                url={props.url}
                castShadow
                geometry={nodes.Tablet.geometry}
                material={materials.Tablet}
                position={[0.32, 0.41, 0.03]}
                rotation={new THREE.Euler(0, -0.01, 0)}
            />
        </group>
    )

}

useGLTF.preload("/three-portfolio/models/Tablet.gltf")