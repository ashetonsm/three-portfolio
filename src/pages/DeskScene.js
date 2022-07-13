import { Box } from '../components/models/Box'
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Desk from '../components/models/Desk'
import { Text3D } from '../components/models/Text3D'

extend({ OrbitControls })

export const DeskScene = ({ props }) => {

    const [activeItem, setActiveItem] = useState({})

    const makeActive = (obj) => {
        setActiveItem(obj)
        console.log(obj)
    }

    const removeActive = () => {
        setActiveItem({})
    }


    const CameraControls = () => {
        // https://threejs.org/docs/#examples/en/controls/OrbitControls
        const {
            camera,
            gl: { domElement },
        } = useThree();

        camera.setFocalLength(22.5)
        // console.log(camera)
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
                    <Outline blur visibleEdgeColor="red" edgeStrength={100} width={2000} />
                </EffectComposer>
                <Desk />
                <Box position={[2, 0, 0]} color={'lightblue'} onActive={makeActive} onInactive={removeActive} name="Debug Box" />
            </Selection>

            <Text3D>{activeItem.name}</Text3D>
        </Canvas>
    )
}