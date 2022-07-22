import { useRef, useState } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useTexture } from "@react-three/drei/core"
import { DoubleSide } from "three"

export const BigScreen = (props) => {
    const ref = useRef()
    let currentTexture = props.material
    return (
        <mesh
            {...props}
            ref={ref}
        >
            <planeGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                map={currentTexture}
                transparent={true}
            />
        </mesh>
    )

}