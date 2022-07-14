import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

    const [hovered, hover] = useState(null)
    const group = useRef();

    const { nodes, materials } = useGLTF("models/PortfolioObjects.gltf");

    return (
        <Select enabled={hovered}>

            <group ref={group} {...props} dispose={null} >

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Small_stand_base.geometry}
                    material={materials["Big Monitor Black back"]}
                    position={[-0.31, 0.37, -0.1]}
                    rotation={[0, 0.19, 0]}
                    onPointerOver={() => hover(true)}
                    onPointerOut={() => hover(false)}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Monitor_holder_stem.geometry}
                        material={materials["Big Monitor Black back"]}
                        position={[0, 0.11, 0.03]}
                    />
                    <group position={[0, 0.19, 0.05]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Monitor_Screen_1.geometry}
                            material={materials["Big Monitor Black back"]}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Small_Monitor_Screen_2.geometry}
                            material={materials.Screen}
                        />
                    </group>
                </mesh>
            </group >
        </Select>
    )
}

useGLTF.preload("/PortfolioObjects.gltf");