import * as THREE from 'three'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { useCursor, Image, MeshReflectorMaterial, Text, Environment } from '@react-three/drei'
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing'
import BigMonitor from '../components/models/BigMonitor'
import SmallMonitor from '../components/models/SmallMonitor'
import Keyboard from '../components/models/Keyboard'
import Tablet from '../components/models/Tablet'
import Desk from '../components/models/Desk'
import Computer from '../components/models/Computer'
import Chair from '../components/models/Chair'
import { Box } from '../components/models/Box'
import { Text3D } from '../components/models/Text3D'
import { useRoute, useLocation } from 'wouter'

extend({ BigMonitor, Keyboard, Tablet })

export const DeskScene = ({ props }) => {
    const GOLDENRATIO = 1.61803398875
    const [activeItem, setActiveItem] = useState()
    const [activeURL, setActiveURL] = useState()

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
            // console.log(clicked.current)
            if (clicked.current) {
                clicked.current.children[0].children[0].children[0].updateWorldMatrix(true, true)
                clicked.current.children[0].children[0].children[0].localToWorld(p.set(0, GOLDENRATIO / 7, 0.5))
                clicked.current.children[0].children[0].children[0].getWorldQuaternion(q)
                setActiveItem(clicked.current.linkText)
                setActiveURL(clicked.current.url)
            } else {
                p.set(0, 1.5, 2)
                q.identity()
                setActiveItem()
                setActiveURL()
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
        const name = modelName
        useCursor(hovered)
        useFrame((state) => {
        })
        return (
            <group {...props} url={url}>
                < props.model
                    name={name}
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

            <Text3D>
                {activeItem}
                {activeURL}
            </Text3D>

        </Canvas>
    )
}