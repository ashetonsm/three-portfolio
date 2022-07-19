import * as THREE from 'three'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { useCursor, Image, MeshReflectorMaterial, Text, Environment } from '@react-three/drei'
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing'
import BigMonitor from '../components/models/BigMonitor'
import Keyboard from '../components/models/Keyboard'
import Tablet from '../components/models/Tablet'
import { useRoute, useLocation } from 'wouter'
import getUuid from 'uuid-by-string'

extend({ BigMonitor })

export const DeskScene = ({ props }) => {
    const GOLDENRATIO = 1.61803398875
    const interatives = [
        { model: BigMonitor, modelName: "BigMonitor" },
        { model: Keyboard, modelName: "Keyboard" },
        { model: Tablet, modelName: "Tablet" },
    ]

    function Frames({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
        const ref = useRef()
        const clicked = useRef()
        const [, params] = useRoute('/item/:id')
        const [, setLocation] = useLocation()
        useEffect(() => {
            clicked.current = ref.current.getObjectByName(params?.id)
            console.log(clicked.current)
            if (clicked.current) {
                clicked.current.parent.updateWorldMatrix(true, true)
                clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 1.25, 1.5))
                clicked.current.parent.getWorldQuaternion(q)
            } else {
                p.set(0, 1.25, 2)
                q.identity()
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
                        <Frame key={props.modelName}  model={props.modelName} {...props} />
                    )}
            </group>
        )
    }

    function Frame({ url, modelName, ...props }) {
        const [hovered, hover] = useState(false)
        const [rnd] = useState(() => Math.random())
        const name = getUuid(modelName)
        useCursor(hovered)
        useFrame((state) => {
        })
        return (
            <group {...props}>
                    <Tablet
                        name={name}
                        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                        position={[0, GOLDENRATIO / 2, 1]}
                        onPointerOut={() => hover(false)}
                        raycast={() => null}
                        scale={[1, 1, 1]}
                        />
                <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
                    {name.split('-').join(' ')}
                </Text>
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
            <Frames />

        </Canvas>
    )
}