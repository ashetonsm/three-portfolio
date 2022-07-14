import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

    const [hovered, hover] = useState(null)
    const group = useRef();

    const { nodes, materials } = useGLTF("models/PortfolioObjects.gltf");

    return (
        <group ref={group} {...props} dispose={null} >

            <Select enabled={hovered}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Big_stand_base.geometry}
                    material={materials["Shiny Black Plastic"]}
                    position={[0.21, 0.37, -0.13]}
                    rotation={[0, -0.12, 0]}
                    onPointerOver={() => hover(true)}
                    onPointerOut={() => hover(false)}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Big_stand_metal_part.geometry}
                        material={materials["Big Monitor Grey Plastic"]}
                        position={[0, 0.01, 0]}
                    >
                        <group position={[0, 0.21, 0]}>
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Beeg_Monitor_Screen_1.geometry}
                                material={materials["Big Monitor Grey Plastic"]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Beeg_Monitor_Screen_2.geometry}
                                material={materials["Big Monitor Black Rim"]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Beeg_Monitor_Screen_3.geometry}
                                material={materials["Big Monitor Black back"]}
                            />
                            <mesh
                                castShadow
                                receiveShadow
                                geometry={nodes.Beeg_Monitor_Screen_4.geometry}
                                material={materials.Screen}
                            />
                        </group>
                    </mesh>
                </mesh>
            </Select>
        </group>
        )
}

useGLTF.preload("/PortfolioObjects.gltf");