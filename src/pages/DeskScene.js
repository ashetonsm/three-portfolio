import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect, Suspense } from "react"
import { useCursor, Html, useProgress } from '@react-three/drei'
import BigMonitor from '../components/models/BigMonitor'
import SmallMonitor from '../components/models/SmallMonitor'
import Keyboard from '../components/models/Keyboard'
import Tablet from '../components/models/Tablet'
import Desk from '../components/models/Desk'
import Computer from '../components/models/Computer'
import Mouse from '../components/models/Mouse'
import { ScreenOverlay } from '../components/models/ScreenOverlay'
import { Box } from '../components/models/Box'
import { TextDrawer } from '../components/UI/TextDrawer'
import { NavBar } from '../components/UI/Navbar'

export const DeskScene = () => {

    const camX = 0
    const camY = 1
    const camZ = 0.90

    const [activeItem, setActiveItem] = useState("Welcome!")
    const [activeURL, setActiveURL] = useState("Please click a model or a link.")
    const [currentItem, setCurrentItem] = useState(null)

    const interactives = [
        { model: BigMonitor, modelName: "BigMonitor", linkText: "GitHub", url: "https://github.com/ashetonsm" },
        { model: SmallMonitor, modelName: "SmallMonitor", linkText: "Resumé", url: "https://www.dropbox.com/s/gplszprw31msqja/Mayfield_A_Resume_R.pdf?dl=0" },
        { model: Keyboard, modelName: "Keyboard", linkText: "Itch.io", url: "https://nnneato.itch.io/" },
        { model: Tablet, modelName: "Tablet", linkText: "ArtStation", url: "https://artstation.com/ashetonsm" },
    ]

    const setActive = (newItem, newURL) => {
        setActiveItem(newItem)
        setActiveURL(newURL)
    }

    const setCurrent = (modelName, linkText, linkUrl) => {
        setCurrentItem(modelName)
        setActive(linkText, linkUrl)
    }

    function Interactives({ p = new THREE.Vector3(camX, camY, camZ) }) {

        const ref = useRef()
        const screens = useRef()
        let drawer = useRef()
        const linksRef = useRef()

        useEffect(() => {

            drawer.current = ref.current.parent.getObjectByName("TextDrawer")
            screens.current = ref.current.parent.getObjectByName("Screens")

            // drawer.current.toggleDrawer(true)

            switch (currentItem) {
                case "SmallMonitor":
                    screens.current.handleTexture(0)
                    p.setX(-0.4)
                    break
                case "Tablet":
                    screens.current.handleTexture(1)
                    p.setX(0.4)
                    break
                case "BigMonitor":
                    screens.current.handleTexture(2)
                    p.setX(0.2)
                    break
                case "Keyboard":
                    screens.current.handleTexture(3)
                    p.setX(-0.2)
                    break
                default:
                    screens.current.handleTexture()
                    // drawer.current.toggleDrawer(false)
                    p.setX(0)
            }
        })

        useFrame((state) => {

            if (currentItem) {
                state.camera.position.lerp(p, 0.025)
                // TextDrawer
                state.scene.children[4].position.set(state.camera.position.x, state.camera.position.y + 0.4, 0)

                // NavLinks
                state.scene.children[3].position.set(state.camera.position.x, state.camera.position.y, 0)
            } else {
                // TextDrawer
                state.scene.children[4].position.set(state.camera.position.x, state.camera.position.y + 0.4, 0)

                // NavLinks
                state.scene.children[3].position.set(state.camera.position.x, state.camera.position.y, 0)
            }
        }, 0)

        return (
            <>
                {/* This is the object that our camera gets its coordinates from */}
                <group
                    ref={ref}
                    onClick={(e) => setCurrent(e.object.name, e.object.linkText, e.object.url)}
                    name="Interactive Meshes"
                >
                    {interactives.map((props) =>
                        <Interactive
                            key={props.modelName}
                            name={props.modelName}
                            model={props.model}
                            linkText={props.linkText}
                            url={props.url}
                            {...props} />
                    )}
                </group>

                {/* This is how the NavBar links are rendered. They need the info from the models to zoom in. */}
                <group
                    ref={linksRef}
                    name="HTML Links" >

                    <Html>
                        <div style={{
                            width: '100vw',
                            padding: 'none',
                            textAlign: 'center',
                            left: '-50vw',
                            position: 'absolute',
                        }}>

                            {interactives.map((props) =>
                                <NavBar
                                    key={props.modelName}
                                    name={props.modelName}
                                    model={props.model}
                                    linkText={props.linkText}
                                    url={props.url}
                                    sendMessage={(modelName, linkText, linkUrl) => setCurrent(modelName, linkText, linkUrl)}
                                    {...props} />
                            )}
                        </div>
                    </Html>
                </group>

                <TextDrawer>
                    {activeItem}
                    {activeURL}
                </TextDrawer>

                <ScreenOverlay name="Screens" />

            </>
        )
    }

    function Interactive({ url, modelName, linkText, ...props }) {
        const [hovered, hover] = useState(false)
        useCursor(hovered)
        return (
            < props.model
                name={modelName}
                linkText={linkText}
                url={url}
                position={[0, 0, 0]}
                onPointerOver={(e) => (hover(true))}
                onPointerOut={() => hover(false)}
            />
        )
    }

    function Loader() {
        const { progress } = useProgress()
        return <Html center>{Math.round(progress)} % loaded</Html>
    }

    return (
        <Canvas shadows style={{ height: '100vh' }} camera={{
            position: [camX, camY, camZ],
            rotation: [-0.4, 0, 0],
        }}>
            <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.5} />
                <spotLight
                    castShadow
                    shadow-bias={-0.00002}
                    position={[0, 40, 10]}
                    angle={Math.PI / 50}
                    intensity={1}
                    color={'#effeff'} />

                <Interactives />
                <Box position={[0, 0.05, 1]} />
                <Desk />
                <Computer />
                <Mouse />
            </Suspense>
        </Canvas>
    )
}