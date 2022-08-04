import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect, Suspense } from "react"
import { useCursor, OrbitControls, Html, useProgress, Environment } from '@react-three/drei'
import BigMonitor from '../components/models/BigMonitor'
import SmallMonitor from '../components/models/SmallMonitor'
import Keyboard from '../components/models/Keyboard'
import Tablet from '../components/models/Tablet'
import Desk from '../components/models/Desk'
import Computer from '../components/models/Computer'
import Chair from '../components/models/Chair'
import Mouse from '../components/models/Mouse'
import { ScreenOverlay } from '../components/models/ScreenOverlay'
import { Box } from '../components/models/Box'
import { Text3D } from '../components/models/Text3D'
import { useRoute, useLocation } from 'wouter'
import getUuidByString from 'uuid-by-string'

export const DeskScene = ({ props }) => {
    const GOLDENRATIO = 1.61803398875
    const [activeItem, setActiveItem] = useState()
    const [activeURL, setActiveURL] = useState()

    const interatives = [
        { model: BigMonitor, modelName: "BigMonitor", linkText: "GitHub", url: "https://github.com/ashetonsm" },
        { model: SmallMonitor, modelName: "SmallMonitor", linkText: "Résumé", url: "https://www.dropbox.com/s/gplszprw31msqja/Mayfield_A_Resume_R.pdf?dl=0" },
        { model: Keyboard, modelName: "Keyboard", linkText: "Itch.io", url: "https://nnneato.itch.io/" },
        { model: Tablet, modelName: "Tablet", linkText: "ArtStation", url: "https://artstation.com/ashetonsm" },
    ]

    function Interactives({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
        const ref = useRef()
        const clicked = useRef()
        const screens = useRef()
        let drawer = useRef()
        const [, params] = useRoute('/three-portfolio/item/:id')
        const [, setLocation] = useLocation()
        useEffect(() => {
            clicked.current = ref.current.getObjectByName(params?.id)
            drawer.current = ref.current.parent.getObjectByName("Text3D")
            screens.current = ref.current.parent.getObjectByName("Screens")

            if (clicked.current) {
                if (clicked.current.children.length !== 0) {
                    clicked.current.children[0].updateWorldMatrix(true, true)
                    clicked.current.children[0].localToWorld(p.set(0, GOLDENRATIO / 7, 0.5))
                    clicked.current.children[0].getWorldQuaternion(q)

                    setActiveItem(clicked.current.parent.linkText)
                    setActiveURL(clicked.current.parent.url)

                    drawer.current.toggleDrawer(true)

                    switch (clicked.current.friendlyName) {
                        case "SmallMonitor":
                            screens.current.handleTexture(0)
                            break
                        case "Tablet":
                            screens.current.handleTexture(1)
                            break
                        case "BigMonitor":
                            screens.current.handleTexture(2)
                            break
                        case "Keyboard":
                            screens.current.handleTexture(3)
                            break
                        default:
                            screens.current.handleTexture()
                    }
                }

            } else {
                p.set(0, 1.5, 2)
                q.identity()
                screens.current.handleTexture()
                drawer.current.toggleDrawer(false)
            }
        })
        useFrame((state, dt) => {
            state.camera.position.lerp(p, 0.025)
            state.camera.quaternion.slerp(q, 0.025)
        })
        return (
            <group
                ref={ref}
                onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/three-portfolio' : '/three-portfolio/item/' + e.object.parent.name))}
                onPointerMissed={() => setLocation('/three-portfolio')}>
                {
                    interatives.map((props) =>
                        <Interactive
                            key={props.modelName}
                            name={props.modelName}
                            model={props.model}
                            linkText={props.linkText}
                            url={props.url}
                            {...props} />
                    )}
            </group>
        )
    }

    function Interactive({ url, modelName, ...props }) {
        const [hovered, hover] = useState(false)
        const name = getUuidByString(modelName)
        const friendlyName = modelName
        useCursor(hovered)
        useFrame((state) => {
        })
        return (
            <group {...props} url={url}>
                < props.model
                    name={name}
                    friendlyName={friendlyName}
                    onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                    position={[0, GOLDENRATIO / 2, 1]}
                    onPointerOut={() => hover(false)}
                />
            </group>
        )
    }

    function Loader() {
        const { progress } = useProgress()
        return <Html center>{Math.round(progress)} % loaded</Html>
    }


    return (
        <Canvas shadows style={{ height: '100vh' }} >
            <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.5}/>
            <spotLight 
                castShadow
                shadow-bias={-0.00003}
                position={[0, 40, 10]} 
                angle={Math.PI / 50}
                intensity={1} 
                color={'#effeff'} />

            <OrbitControls
                minAzimuthAngle={Math.PI / -5}
                maxAzimuthAngle={Math.PI / 5}
                autoRotate={false}
                maxPolarAngle={Math.PI / 4}
                minPolarAngle={Math.PI / 5}
                enableZoom={false}
                enablePan={false}
            />

                <Text3D>
                    {activeItem}
                    {activeURL}
                </Text3D>


                <Interactives />

                <ScreenOverlay
                    name="Screens"
                />

                <Box position={[0, GOLDENRATIO / 2, 2.5]} />

                <Desk
                    position={[0, GOLDENRATIO / 2, 1]} />
                <Computer
                    position={[0, GOLDENRATIO / 2, 1]} />
                <Chair
                    position={[0, GOLDENRATIO / 2, 1]} />
                <Mouse
                    position={[0, GOLDENRATIO / 2, 1]} />
            </Suspense>

        </Canvas>
    )
}