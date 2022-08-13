import * as THREE from 'three'
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model({ ...props }) {

    const group = useRef()
    const { nodes, materials } = useGLTF("/three-portfolio/models/Keyboard.gltf")

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>
            <mesh
                name="Keyboard"
                linkText={props.linkText}
                url={props.url}
                castShadow
                geometry={nodes.Keys.geometry}
                material={materials.Keyboard}
                position={[-0.2, 0.4, 0.1]}
                rotation={new THREE.Euler(0, 0.2, 0)}

            />
        </group>
    )
}

useGLTF.preload("/three-portfolio/models/Keyboard.gltf")
