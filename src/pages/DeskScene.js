import * as THREE from 'three'
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { useCursor, OrbitControls, useTexture } from '@react-three/drei'
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing'
import { TextureLoader } from "three/src/loaders/TextureLoader"
import BigMonitor from '../components/models/BigMonitor'
import SmallMonitor from '../components/models/SmallMonitor'
import Keyboard from '../components/models/Keyboard'
import Tablet from '../components/models/Tablet'
import Desk from '../components/models/Desk'
import Computer from '../components/models/Computer'
import Chair from '../components/models/Chair'
import { TestBox } from '../components/models/TestBox'
import { BigScreen } from '../components/models/BigScreen'
import { Box } from '../components/models/Box'
import { Text3D } from '../components/models/Text3D'
import { useRoute, useLocation } from 'wouter'
import getUuidByString from 'uuid-by-string'

extend({ BigMonitor, Keyboard, Tablet })

export const DeskScene = ({ props }) => {
    const GOLDENRATIO = 1.61803398875
    const [activeItem, setActiveItem] = useState()
    const [activeURL, setActiveURL] = useState()
    const [showPanelR, setShowPanelR] = useState(false)
    const [showPanelL, setShowPanelL] = useState(false)

    const [artstationTex, githubTex, itchTex] = useLoader(TextureLoader,
        [
            '/three-portfolio/textures/artstation-logo.png',
            '/three-portfolio/textures/github-logo.png',
            '/three-portfolio/textures/itchio-logo.png',
        ])


    const [bigMonTex, setBigMonTex] = useState(artstationTex)
    const [smallMonTex, setSmallMonTex] = useState(artstationTex)

    const interatives = [
        { model: BigMonitor, modelName: "BigMonitor", linkText: "Github", url: "https://github.com/ashetonsm" },
        { model: SmallMonitor, modelName: "SmallMonitor", linkText: "Resume", url: "" },
        { model: Keyboard, modelName: "Keyboard", linkText: "Itch.io", url: "https://nnneato.itch.io/" },
        { model: Tablet, modelName: "Tablet", linkText: "ArtStation", url: "https://artstation.com/ashetonsm" },
    ]

    function Interactives({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
        const ref = useRef()
        const clicked = useRef()
        const [, params] = useRoute('/item/:id')
        const [, setLocation] = useLocation()
        useEffect(() => {
            clicked.current = ref.current.getObjectByName(params?.id)
            if (clicked.current) {
                if (clicked.current.children.length !== 0) {
                    console.log(clicked.current)
                    clicked.current.children[0].updateWorldMatrix(true, true)
                    clicked.current.children[0].localToWorld(p.set(0, GOLDENRATIO / 7, 0.5))
                    clicked.current.children[0].getWorldQuaternion(q)

                    if (clicked.current.friendlyName === "BigMonitor") {
                        setBigMonTex(githubTex)
                        setSmallMonTex(githubTex)
                    }
                    if (clicked.current.friendlyName === "SmallMonitor") {
                        // This should be the resume
                        setBigMonTex(itchTex)
                        setSmallMonTex(itchTex)
                    }
                    if (clicked.current.friendlyName === "Keyboard") {
                        setSmallMonTex(itchTex)
                        setBigMonTex(itchTex)
                    }
                    if (clicked.current.friendlyName === "Tablet") {
                        setSmallMonTex(artstationTex)
                        setBigMonTex(artstationTex)
                    }


                    setActiveItem(clicked.current.parent.parent.linkText)
                    setActiveURL(clicked.current.parent.parent.url)
                    setShowPanelL(true)
                    setShowPanelR(true)
                }

            } else {
                p.set(0, 1.5, 2)
                q.identity()
                setActiveItem()
                setActiveURL()
                setShowPanelR(false)
                setShowPanelL(false)
            }
        })
        useFrame((state, dt) => {
            state.camera.position.lerp(p, 0.025)
            state.camera.quaternion.slerp(q, 0.025)
        })
        return (
            <group
                ref={ref}
                onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.parent.name))}
                onPointerMissed={() => setLocation('/')}>
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

    return (
        <Canvas style={{ height: 500 }} >
            <ambientLight intensity={1} />
            <OrbitControls
                minAzimuthAngle={Math.PI / -5}
                maxAzimuthAngle={Math.PI / 5}
                autoRotate={false}
                maxPolarAngle={Math.PI / 4}
                minPolarAngle={Math.PI / 5}
                enableZoom={false}
                enablePan={false}
            />

            {activeItem !== undefined ?
                <Text3D>
                    {activeItem}
                    {activeURL}
                </Text3D>
                : null
            }

            {showPanelR === true ?
                <BigScreen
                    material={bigMonTex}
                    position={[0.215, 1.4, .895]}
                    scale={[.25, .25, .25]}
                />
                : null}

            {showPanelL === true ?
                <BigScreen
                    material={smallMonTex}
                    position={[-0.3, 1.4, 0.96]}
                    scale={[.25, .25, .25]}
                />
                : null}

            <Selection>
                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline blur
                        visibleEdgeColor="#00c5d0"
                        edgeStrength={50}
                        width={2500} />
                </EffectComposer>
            </Selection>

            <Interactives />

            <Box />

            <Desk
                position={[0, GOLDENRATIO / 2, 1]} />
            <Computer
                position={[0, GOLDENRATIO / 2, 1]} />
            <Chair
                position={[0, GOLDENRATIO / 2, 1]} />
        </Canvas>
    )
}