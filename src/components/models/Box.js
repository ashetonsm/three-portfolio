import { useState, useRef } from "react"
import { useFrame } from '@react-three/fiber'
import { useSpring, animated, config } from "@react-spring/three"

export const Box = (props) => {

    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [active, setActive] = useState(false)
    
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))

    const handleClick = (obj) => {
        console.log(scale)
        setActive(true)
        obj.position.set(0, 0, 0)
        props.onActive(obj)
    }

    const makeInactive = () => {
        setActive(false)
    }

    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.gentle
      });

    return (
        <animated.mesh
            {...props}
            ref={ref}
            scale={scale}
            makeInactive={(event) => makeInactive()}
            onClick={(event) => handleClick(event.object)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
            >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered && !active ? '#ffffff' : props.color} />
        </animated.mesh>
    )

}