import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"

export default function Model({ ...props }) {

    const group = useRef()
    const { nodes, materials } = useGLTF("/three-portfolio/models/Tablet.gltf")
    const imgTex = useLoader(TextureLoader, '/three-portfolio/textures/artstation-text.png')

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>
            {props.name === "copy" ?
                <mesh
                    position={[0.2, 0.63, 0]}
                    scale={[0.1, 0.1, 1]} >
                    <planeGeometry />
                    <meshBasicMaterial
                        map={imgTex}
                        opacity={1}
                    />
                </mesh>
                :
                <mesh
                    castShadow
                    geometry={nodes.Tablet.geometry}
                    material={materials.Tablet}
                    position={[0.38, 0.41, 0.01]}
                />
            }
        </group>
    )

}

useGLTF.preload("/three-portfolio/models/Tablet.gltf")