import * as THREE from 'three'
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

            {/* Big (right) monitor */}
            <mesh
                position={[0.2, 0.6, -0.1]}
                scale={[0.25, 0.25, 0.25]}
                rotation={new THREE.Euler(0, -0.2, 0)}
            >
                <planeGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    map={currentTexture}
                    opacity={1}
                    transparent={true}
                    side={DoubleSide}
                />
            </mesh>

            {/* Small (left) monitor */}
            <mesh
                position={[-0.30, 0.58, -0.04]}
                scale={[0.2, 0.2, 0.2]}
                rotation={new THREE.Euler(0, 0.2, 0)}
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