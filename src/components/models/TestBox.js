import { useRef, useState } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useTexture } from "@react-three/drei/core"
import { DoubleSide } from "three"

export const TestBox = (props) => {
    const ref = useRef()
    useFrame(({ camera }) => ref.current.quaternion.copy(camera.quaternion))

    /*
    const [defaultTex, artstationTex, githubTex, itchTex] = useLoader(TextureLoader, 
        [
            '/three-portfolio/textures/BigMonitorTexture.png',
            '/three-portfolio/textures/BigMonitorTextureAS.png',
            '/three-portfolio/textures/BigMonitorTextureGH.png',
            '/three-portfolio/textures/BigMonitorTextureITCH.png',
        ])

    const textures = [defaultTex, artstationTex, githubTex, itchTex]
    let texNum = 0;
    const [currentTexture, setCurrentTexture] = useState(textures[texNum])

    const nextTexture = () => {
        console.log("Switching textures")
        texNum += 1
        if (texNum > (textures.length - 1)) {
            texNum = 0
            console.log("texNum = " + texNum)
        }
        return setCurrentTexture(textures[texNum])
    }

*/
    return (
        <mesh
            {...props}
            ref={ref}
            // onClick={() => nextTexture()}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
            // map={currentTexture}
            />
        </mesh>
    )

}