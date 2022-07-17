import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

    const [hovered, hover] = useState(null)
    const [active, setActive] = useState(false)
    const group = useRef();
    const { nodes, materials } = useGLTF("models/Chair.gltf");

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

    const notHovering = () => {
        if (!active) {
            hover(false)
        }
        props.onExitHover()
    }

    return (
        <Select enabled={hovered}>
            <group
                ref={group}
                {...props}
                dispose={null}
                onPointerOver={(event) => hovering(event.object.parent)}
                onPointerOut={(event) => notHovering()}
                onClick={(event) => handleClick(event.object.parent)}>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Chair.geometry}
                    material={materials.Chair}
                    position={[0, 0.38, 0.87]}
                />
            </group>
        </Select>
    );
}

useGLTF.preload("/Chair.gltf");