import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'


export default function Model({ ...props }) {

    const group = useRef();
    const { nodes, materials } = useGLTF("/three-portfolio/models/BigMonitor.gltf");

    return (
        <Select>
            <group
                ref={group}
                {...props}
                dispose={null}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Beeg_Monitor_Screen.geometry}
                    material={materials["Big Monitor"]}
                    position={[0.21, 0.5, -0.12]}
                />

            {/* <mesh
                position={[0.22, .6, -.1]}
                scale={[.5, .3, .5]}>
                <planeGeometry />
                <meshStandardMaterial />
            </mesh> */}
            </group>
        </Select>
    )
}

useGLTF.preload("/BigMonitor.gltf");