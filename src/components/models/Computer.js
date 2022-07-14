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
                    geometry={nodes.Tower.geometry}
                    material={materials.Computer}
                    position={[0.33, -0.04, 0]}
                    onPointerOver={() => hover(true)}
                    onPointerOut={() => hover(false)}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh_grate.geometry}
                        material={materials["Mesh Panel"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube011.geometry}
                        material={materials["Front Panels"]}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube011_1.geometry}
                        material={materials["Mesh Panel"]}
                    />
                </mesh>
            </Select>
        </group>)

}

useGLTF.preload("/PortfolioObjects.gltf");