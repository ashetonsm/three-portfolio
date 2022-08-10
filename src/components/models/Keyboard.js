import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader"

export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/Keyboard.gltf")
    const imgTex = useLoader(TextureLoader, '/three-portfolio/textures/itch-text.png')

    return (
        <group
            ref={group}
            {...props}
            dispose={null}>
            {props.name === "copy" ?
                <mesh
                    position={[0.07, 0.63, 0]}
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
                    geometry={nodes.Keys.geometry}
                    material={materials.Keyboard}
                    position={[-0.14, 0.4, 0.12]}
                />
            }
        </group>
    )
}

useGLTF.preload("/three-portfolio/models/Keyboard.gltf");
