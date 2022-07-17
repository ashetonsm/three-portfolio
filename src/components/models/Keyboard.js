import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

    const [hovered, hover] = useState(null)
    const [active, setActive] = useState(false)
    const group = useRef();
    const { nodes, materials } = useGLTF("models/Keyboard.gltf");

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
                    geometry={nodes.Keyboard.geometry}
                    material={materials.Keyboard}
                    position={[-0.14, 0.4, 0.12]}
                />
            </group>
        </Select>
    );
}

useGLTF.preload("/Keyboard.gltf");
