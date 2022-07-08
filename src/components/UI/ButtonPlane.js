import { useState, useRef } from "react"
import arrowLeft from "./images/arrowLeft.png"
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'


export const ButtonPlane = (props) => {

    const [colorMap] = useLoader(TextureLoader, [arrowLeft])

    const ref = useRef()
    const [hovered, hover] = useState(false)

    return (
        <mesh
            {...props}
            ref={ref}
            scale={hovered ? 1.5 : 1}
            onClick={(event) => props.handleClick()}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <planeGeometry args={[5, 5]} />
            <meshStandardMaterial map={colorMap} transparent />
        </mesh>
    )
}