import { useState, useRef } from "react"
import { useFrame } from '@react-three/fiber'

export const Box = (props) => {

    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [active, setActive] = useState(false)
    
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))

    const handleClick = (obj) => {
        setActive(true)
        obj.position.set(0, 0, 0)
        props.onActive(obj)
    }

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(event) => handleClick(event.object)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? '#474747' : props.color} />
        </mesh>
    )

}