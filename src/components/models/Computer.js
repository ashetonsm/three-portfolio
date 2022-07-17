import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

    const [hovered, hover] = useState(null)
    const [active, setActive] = useState(false)

    const group = useRef();

    const { nodes, materials } = useGLTF("models/PortfolioObjects.gltf");

    const handleClick = (obj) => {
        if (!active === false) {
            props.onInactive()
        } else {
            props.onActive(obj)
        }
        setActive(!active)
    }

    const hovering = (obj) => {
        hover(true)
        props.onHover(obj)
    }

    const notHovering = (obj) => {
        if (!active) {
            hover(false)
        }
        props.onExitHover(obj)
    }
    return (
        <group ref={group} {...props} dispose={null} >

            <Select enabled={hovered}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Tower.geometry}
                    material={materials.Computer}
                    position={[0.33, -0.04, 0]}
                    onPointerOver={(event) => hovering(event.object.parent.parent)}
                    onPointerOut={(event) => notHovering()}
                    onClick={(event) => handleClick(event.object.parent.parent)}
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