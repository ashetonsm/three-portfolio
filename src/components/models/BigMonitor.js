import * as THREE from 'three'
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/BigMonitor.gltf")

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>
            <mesh
                name="BigMonitor"
                linkText={props.linkText}
                url={props.url}
                castShadow
                geometry={nodes.Beeg_Monitor_Screen.geometry}
                material={materials["Big Monitor"]}
                position={[0.21, 0.5, -0.12]}
                rotation={new THREE.Euler(0, -0.2, 0)}
            />
        </group>
    )
}

useGLTF.preload("/three-portfolio/models/BigMonitor.gltf")