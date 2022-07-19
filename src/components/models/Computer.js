import React, { useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model({ ...props }) {

    const group = useRef()
    const { nodes, materials } = useGLTF("models/ComputerTower.gltf")

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
                    geometry={nodes.Computer_Tower.geometry}
                    material={materials.Computer}
                    position={[0.33, -0.04, 0]}
                />
            </group>
    )

}

useGLTF.preload("/ComputerTower.gltf")