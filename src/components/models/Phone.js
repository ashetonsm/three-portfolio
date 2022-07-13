/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef, useState } from "react"
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"

export default function Model({ ...props }) {
    const group = useRef()

    const [hovered, hover] = useState(false)
    const [active, setActive] = useState(false)
    const { viewport } = useThree()
    const { nodes, materials } = useGLTF("models/Phone.gltf")

    const handleClick = (obj) => {
        setActive(true)
        obj.parent.position.set(obj.parent.position.x, (viewport.height / 20) * 2, 0)
        props.onActive(obj)
    }

    const makeInactive = () => {
        setActive(false)
    }

    const { scale } = useSpring({
        scale: active ? (viewport.width / 8) * 1 : (viewport.width / 10) * 1,
        config: config.gentle
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <animated.mesh
                ref={group}
                castShadow
                receiveShadow
                geometry={nodes.Telephone.geometry}
                material={nodes.Telephone.material}
                rotation={[25.5, 0, 0]}
                scale={scale}

                makeInactive={(event) => makeInactive()}
                onClick={(event) => handleClick(event.object)}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}
            />
        </group>
    )
}

useGLTF.preload("/Phone.gltf")