import { useState, useRef } from "react"
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from "@react-spring/three"
import { Select } from "@react-three/postprocessing"

export const Box = (props) => {

    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [active, setActive] = useState(false)

    const handleClick = (obj) => {
        if (!active === false) {
            props.onInactive()
        } else {
            props.onActive(obj)
        }
        setActive(!active)
    }

    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.gentle
      });

    return (
        <Select enabled={hovered || active}>

        <animated.mesh
            {...props}
            ref={ref}
            scale={scale}
            onClick={(event) => handleClick(event.object)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
            >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered || active ? props.color : '#ffffff' } />
        </animated.mesh>
        </Select>

    )

}