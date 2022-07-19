import React, { useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model({ ...props }) {

    const group = useRef()
    const { nodes, materials } = useGLTF("models/Chair.gltf")

    /*
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
    */

    return (
            <group
                ref={group}
                {...props}
                dispose={null}>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Chair.geometry}
                    material={materials.Chair}
                    position={[0, 0.38, 0.87]}
                />
            </group>
    )
}

useGLTF.preload("/Chair.gltf")
