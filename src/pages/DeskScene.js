import * as THREE from 'three'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import { useCursor, Image, MeshReflectorMaterial, Text, Environment } from '@react-three/drei'
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Desk from '../components/models/Desk'
import Computer from '../components/models/Computer'
import BigMonitor from '../components/models/BigMonitor'
import SmallMonitor from '../components/models/SmallMonitor'
import Chair from '../components/models/Chair'
import Keyboard from '../components/models/Keyboard'
import Tablet from '../components/models/Tablet'
import { Text3D } from '../components/models/Text3D'
import { useRoute, useLocation } from 'wouter'
import getUuid from 'uuid-by-string'

export const DeskScene = ({ props }) => {
    const GOLDENRATIO = 1.61803398875
    const images = [
        { url: 'https://placekitten.com/500/400' },
        { url: 'https://placekitten.com/400/500' },
        { url: 'https://placekitten.com/400/400' },
    ]

    function Frames({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
        const ref = useRef()
        const clicked = useRef()
        const [, params] = useRoute('/item/:id')
        const [, setLocation] = useLocation()
        useEffect(() => {
            clicked.current = ref.current.getObjectByName(params?.id)
            if (clicked.current) {
                clicked.current.parent.updateWorldMatrix(true, true)
                clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
                clicked.current.parent.getWorldQuaternion(q)
            } else {
                p.set(0, 0, 5.5)
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
                onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
                onPointerMissed={() => setLocation('/')}>
                {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
            </group>
        )
    }

    function Frame({ url, c = new THREE.Color(), ...props }) {
        const [hovered, hover] = useState(false)
        const [rnd] = useState(() => Math.random())
        const image = useRef()
        const frame = useRef()
        const name = getUuid(url)
        useCursor(hovered)
        useFrame((state) => {
            image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
            image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
            image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
            frame.current.material.color.lerp(c.set(hovered ? 'orange' : 'white'), 0.1)
        })
        return (
            <group {...props}>
                <mesh
                    name={name}
                    onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                    onPointerOut={() => hover(false)}
                    scale={[1, GOLDENRATIO, 0.05]}
                    position={[0, GOLDENRATIO / 2, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
                    <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                        <boxGeometry />
                        <meshBasicMaterial toneMapped={false} fog={false} />
                    </mesh>
                    <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
                </mesh>
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
                <Frames />
            </Selection>

        </Canvas>
    )
}