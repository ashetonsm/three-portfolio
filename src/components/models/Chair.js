import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model({ ...props }) {

    const group = useRef()
    const { nodes, materials } = useGLTF("/three-portfolio/models/Chair.gltf")

    return (
            <group
                ref={group}
                {...props}
                dispose={null}>

                <mesh
                    castShadow
                    geometry={nodes.Chair.geometry}
                    material={materials.Chair}
                    position={[0, 0.38, 0.87]}
                />
            </group>
    )
}

useGLTF.preload("/three-portfolio/models/Chair.gltf")
