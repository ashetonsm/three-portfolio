import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model({ ...props }) {

    const group = useRef()
    const { nodes, materials } = useGLTF("/three-portfolio/models/ComputerTower.gltf")

    return (

        <group
            ref={group}
            {...props}
            dispose={null}>

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Computer_Tower.geometry}
                material={materials.Computer}
                position={[0.33, -0.04, 0]}
            />
        </group>
    )

}

useGLTF.preload("/ComputerTower.gltf")