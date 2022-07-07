import { useState, useRef } from "react"

export const ButtonPlane = (props) => {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial color={hovered ? 'slategrey' : 'lightslategrey'} />
        </mesh>
    )
}