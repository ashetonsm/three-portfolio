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
import {Text3D} from '../components/models/Text3D'
import { useRoute, useLocation } from 'wouter'
import getUuid from 'uuid-by-string'

extend({ BigMonitor, Keyboard, Tablet })

export const DeskScene = ({ props }) => {
    const GOLDENRATIO = 1.61803398875
    const [activeItem, setActiveItem] = useState()

    const interatives = [
        { model: BigMonitor, modelNum: "0", modelName: "BigMonitor"},
        { model: SmallMonitor, modelNum: "1", modelName: "SmallMonitor"},
        { model: Keyboard, modelNum: "2", modelName: "Keyboard" },
        { model: Tablet, modelNum: "3", modelName: "Tablet" },
    ]

    function Interactives({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
        const ref = useRef()
        const clicked = useRef()
        const [, params] = useRoute('/item/:id')
        const [, setLocation] = useLocation()
        useEffect(() => {
            clicked.current = ref.current.getObjectByName(params?.id)
            console.log(clicked.current)
            if (clicked.current) {
                clicked.current.children[0].children[0].children[0].updateWorldMatrix(true, true)
                clicked.current.children[0].children[0].children[0].localToWorld(p.set(0, GOLDENRATIO / 7, 0.5))
                clicked.current.children[0].children[0].children[0].getWorldQuaternion(q)
                console.log(clicked.current.children[0].children[0].name)
                setActiveItem(clicked.current.children[0].children[0].name)
            } else {
                p.set(0, 1.5, 2)
                q.identity()
                setActiveItem()
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
                        <Interactive key={props.modelNum}  model={props.model} name={props.modelName} {...props} />
                    )}
            </group>
        )
    }

    function Interactive({ url, modelName, model, ...props }) {
        const [hovered, hover] = useState(false)
        const name = modelName
        useCursor(hovered)
        useFrame((state) => {
        })
        return (
            <group {...props}>
                {modelName === "Tablet" ? 
                                    <Tablet
                                    name={name}
                                    onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                                    position={[0, GOLDENRATIO / 2, 1]}
                                    onPointerOut={() => hover(false)}
                                    scale={[1, 1, 1]}
                                    /> : 
                                    
                modelName === "BigMonitor" ? 
                                    <BigMonitor
                                    name={name}
                                    onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                                    position={[0, GOLDENRATIO / 2, 1]}
                                    onPointerOut={() => hover(false)}
                                    scale={[1, 1, 1]}
                                    /> : 

                modelName === "SmallMonitor" ? 
                                    <SmallMonitor
                                    name={name}
                                    onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                                    position={[0, GOLDENRATIO / 2, 1]}
                                    onPointerOut={() => hover(false)}
                                    scale={[1, 1, 1]}
                                    /> : 

                modelName === "Keyboard" ? 
                                    <Keyboard
                                    name={name}
                                    onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                                    position={[0, GOLDENRATIO / 2, 1]}
                                    onPointerOut={() => hover(false)}
                                    scale={[1, 1, 1]}
                                    /> : 
                                    
                                    null}
            </group>
        )
    }

    return (
        <Canvas style={{ height: 500 }} >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Selection>
                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline blur
                        visibleEdgeColor="#00c5d0"
                        edgeStrength={50}
                        width={2500} />
                </EffectComposer>
            </Selection>

            <Interactives />

            <Desk
            position={[0, GOLDENRATIO / 2, 1]}/>
            <Computer
            position={[0, GOLDENRATIO / 2, 1]}/>
            <Chair
            position={[0, GOLDENRATIO / 2, 1]}/>

            <Text3D>{activeItem}</Text3D>

        </Canvas>
    )
}