import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader"

export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/SmallMonitor.gltf")
    const imgTex = useLoader(TextureLoader, '/three-portfolio/textures/resume-text.png')

    return (
        <group
            ref={group}
            {...props}
            dispose={null} >
            {props.name === "copy" ?
                <mesh
                    position={[-0.06, 0.63, 0]}
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
                    geometry={nodes.Small_Monitor_Screen.geometry}
                    material={materials["Small Monitor"]}
                    position={[-0.31, 0.51, -0.07]}
                />
            }
        </group>
    )
}

useGLTF.preload("/three-portfolio/models/SmallMonitor.gltf");