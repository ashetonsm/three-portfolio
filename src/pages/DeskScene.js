import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect, Suspense } from "react"
import { useCursor, OrbitControls, Html, useProgress } from '@react-three/drei'
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
import { TextDrawer } from '../components/UI/TextDrawer'
import getUuidByString from 'uuid-by-string'

export const DeskScene = () => {
    const GOLDENRATIO = 1.61803398875
    const [activeItem, setActiveItem] = useState()
    const [activeURL, setActiveURL] = useState()
    const [currentItem, setCurrentItem] = useState(null)
    const [currentParent, setCurrentParent] = useState(null)

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

    const setCurrent = (newCurrent, newCurrentParent) => {

        console.log(newCurrent)
        setCurrentItem(newCurrent)
        setCurrentParent(newCurrentParent)
    }

    function Interactives({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {

        const ref = useRef()
        const screens = useRef()
        let drawer = useRef()

        useEffect(() => {

            drawer.current = ref.current.parent.getObjectByName("TextDrawer")
            screens.current = ref.current.parent.getObjectByName("Screens")

            if (currentItem === null) {
                // Set default location
                p.set(0, 1.5, 2)
                q.identity()
                drawer.current.toggleDrawer(false)
                screens.current.handleTexture()

            } else {
                drawer.current.toggleDrawer(true)

                switch (currentParent.friendlyName) {
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

                setActive(currentParent.linkText, currentParent.linkUrl)
                currentItem.updateWorldMatrix(true, true)
                currentItem.localToWorld(p.set(0, GOLDENRATIO / 7, 2.5))
                currentItem.getWorldQuaternion(q)
            }

        })
        useFrame((state) => {
            state.camera.position.lerp(p, 0.025)
            state.camera.quaternion.slerp(q, 0.025)
        })
        return (
            <>
            <group
                ref={ref}
                onClick={(e) => setCurrent(e.object, e.object.parent)}
                onPointerMissed={() => setCurrent(null, null)}
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

            {/* This group is for the text links */}
            <group
                ref={ref}
                onClick={(e) => setCurrent(e.object, e.object.parent)}
                onPointerMissed={() => setCurrent(null, null)}
            >
                {interactives.map((props) =>

                    props.modelName == "BigMonitor" ? 
                    <LinkItem
                        key={props.modelName}
                        name={props.modelName}
                        model={props.model}
                        linkText={props.linkText}
                        url={props.url}
                        {...props} /> :

                        
                    props.modelName == "SmallMonitor" ? 
                    <LinkItem
                        key={props.modelName}
                        name={props.modelName}
                        model={props.model}
                        linkText={props.linkText}
                        url={props.url}
                        {...props} /> :

                    props.modelName == "Keyboard" ? 
                    <LinkItem
                        key={props.modelName}
                        name={props.modelName}
                        model={props.model}
                        linkText={props.linkText}
                        url={props.url}
                        {...props} /> :

                    props.modelName == "Tablet" ? 
                    <LinkItem
                        key={props.modelName}
                        name={props.modelName}
                        model={props.model}
                        linkText={props.linkText}
                        url={props.url}
                        {...props} /> : null
                )}
            </group>
            </>
        )
    }

    function Interactive({ url, modelName, linkText, ...props }) {
        const [hovered, hover] = useState(false)
        const name = getUuidByString(modelName)
        const friendlyName = modelName
        useCursor(hovered)
        return (
            <group {...props}>
                < props.model
                    name={name}
                    friendlyName={friendlyName}
                    linkText={linkText}
                    linkUrl={url}
                    onPointerOver={(e) => (hover(true))}
                    position={[0, GOLDENRATIO / 2, 1]}
                    onPointerOut={() => hover(false)}
                />
            </group>
        )
    }

    function LinkItem({ url, modelName, linkText, ...props }) {
        const [hovered, hover] = useState(false)
        const friendlyName = modelName
        useCursor(hovered)
        return (
                < props.model  {...props}
                    name={"copy"}
                    friendlyName={friendlyName}
                    linkText={linkText}
                    linkUrl={url}
                    onPointerOver={(e) => (hover(true))}
                    position={[0, 1, 1]}
                    onPointerOut={() => hover(false)}
                />
        )
    }

    function Loader() {
        const { progress } = useProgress()
        return <Html center>{Math.round(progress)} % loaded</Html>
    }


    return (
        <Canvas shadows style={{ height: '100vh' }} >
            <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.5} />
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
                    minPolarAngle={Math.PI / 4}
                    enableZoom={false}
                    enablePan={false}
                />

                <TextDrawer>
                    {activeItem}
                    {activeURL}
                </TextDrawer>

                <Interactives />

                <ScreenOverlay name="Screens" />

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