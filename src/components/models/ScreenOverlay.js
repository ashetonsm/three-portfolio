// import * as THREE from 'three'
import React, { useRef, useState } from "react"
import { useLoader } from "@react-three/fiber"
import { DoubleSide } from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"

export const ScreenOverlay = (props) => {
    const ref = useRef()

    const [transparentTex, artstationTex, githubTex, itchTex, resumeTex] = useLoader(TextureLoader,
        [
            '/three-portfolio/textures/transparentPixel.png',
            '/three-portfolio/textures/artstation-logo.png',
            '/three-portfolio/textures/github-logo.png',
            '/three-portfolio/textures/itchio-logo.png',
            '/three-portfolio/textures/resume-logo.png',
        ])

    const [currentTexture, setCurrentTexture] = useState(transparentTex)

    const handleTexture = (texture) => {
        switch (texture) {
            case 0: {
                setCurrentTexture(resumeTex)
                break
            }
            case 1: {
                setCurrentTexture(artstationTex)
                break
            }
            case 2: {
                setCurrentTexture(githubTex)
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
        <group
            ref={ref}
            {...props}
            dispose={null}

            handleTexture={handleTexture}
        >

            <mesh
                position={[0.22, 0.6, 0.9]}
                scale={[0.25, 0.25, 0.25]}
            >
                <planeGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    map={currentTexture}
                    opacity={1}
                    transparent={true}
                    side={DoubleSide}
                />
            </mesh>

            <mesh
                position={[-0.30, 0.6, 0.96]}
                scale={[0.2, 0.2, 0.2]}
            >
                <planeGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    map={currentTexture}
                    opacity={1}
                    transparent={true}
                    side={DoubleSide}
                />
            </mesh>

        </group>
    )
}