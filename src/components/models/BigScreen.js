import React, { useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { DoubleSide } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader"

export const BigScreen = (props) => {
    const ref = useRef()

    const [transparentTex, artstationTex, githubTex, itchTex] = useLoader(TextureLoader,
        [
            '/three-portfolio/textures/transparentPixel.png',
            '/three-portfolio/textures/artstation-logo.png',
            '/three-portfolio/textures/github-logo.png',
            '/three-portfolio/textures/itchio-logo.png',
        ])

    const [currentTexture, setCurrentTexture] = useState(transparentTex)

    const handleTexture = (texture) => {
        switch (texture) {
            case 0: {
                setCurrentTexture(transparentTex)
                break
            }
            case 1: {
                setCurrentTexture(artstationTex)
                console.log("set to #" + texture)
                break
            }
            case 2: {
                setCurrentTexture(githubTex)
                console.log("set to #" + texture)
                break
            }
            case 3: {
                setCurrentTexture(itchTex)
                break
            }
            default:
                setCurrentTexture(transparentTex)
        }
    }

    return (
        <mesh
            {...props}
            ref={ref}
            position={[0.22, 1.4, 0.9]}
            scale={[0.25, 0.25, 0.25]}
            handleTexture={handleTexture}
        >
            <planeGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                map={currentTexture}
                transparent={true}
                side={DoubleSide}
            />
        </mesh>
    )

}