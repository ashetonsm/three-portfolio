import { Box } from '../components/models/Box'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Desk from '../components/models/Desk'
import Computer from '../components/models/Computer'
import BigMonitor from '../components/models/BigMonitor'
import SmallMonitor from '../components/models/SmallMonitor'
import { Text3D } from '../components/models/Text3D'

extend({ OrbitControls })

export const DeskScene = ({ props }) => {

    const [activeItem, setActiveItem] = useState(null)
    const [hoveredItem, setHoveredItem] = useState(null)

    const makeActive = (obj) => {
        setActiveItem(obj)
        console.log(obj)
    }

    const removeActive = () => {
        setActiveItem(null)
    }

    const setText = (obj) => {
        setHoveredItem(obj)
    }

    const removeText = (obj) => {
        setHoveredItem(null)
    }

    const CameraControls = () => {
        // https://threejs.org/docs/#examples/en/controls/OrbitControls
        const {
            camera,
            gl: { domElement },
        } = useThree();

        camera.setFocalLength(22.5)
        const controls = useRef();
        useFrame((state) => controls.current.update());
        return <orbitControls
            ref={controls}
            args={[camera, domElement]}
        />;
    };

    return (
        <Canvas style={{ height: 500 }} >
            <CameraControls />
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
                <Desk
                    onActive={makeActive}
                    onInactive={removeActive}
                    onHover={setText}
                    onExitHover={removeText}
                    name="Debug Desk" />
                <Computer
                    onActive={makeActive}
                    onInactive={removeActive}
                    onHover={setText}
                    onExitHover={removeText}
                    name="Debug Computer" />
                <BigMonitor
                    onActive={makeActive}
                    onInactive={removeActive}
                    onHover={setText}
                    onExitHover={removeText}
                    name="Debug BigMonitor" />
                <SmallMonitor
                    onActive={makeActive}
                    onInactive={removeActive}
                    onHover={setText}
                    onExitHover={removeText}
                    name="Debug SmallMonitor" />
                {/* <Box
                    position={[1, 0, 0]}
                    color={'lightblue'}
                    onActive={makeActive}
                    onInactive={removeActive}
                    onHover={setText}
                    onExitHover={removeText}
                    name="Debug Box" /> */}
            </Selection>

            <Text3D>
                {activeItem == null ?
                    hoveredItem !== null ?
                        hoveredItem.name :
                        'NOTHING SELECTED' :
                    activeItem.name}

            </Text3D>
        </Canvas>
    )
}