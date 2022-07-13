import { Box } from "@react-three/drei"
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Desk from '../components/models/Desk'

extend({ OrbitControls })

export const DeskScene = ({ props }) => {
    const CameraControls = () => {
        // Get a reference to the Three.js Camera, and the canvas html element.
        // We need these to setup the OrbitControls component.
        // https://threejs.org/docs/#examples/en/controls/OrbitControls
        const {
            camera,
            gl: { domElement },
        } = useThree();

        camera.setFocalLength(22.5)
        // console.log(camera)
        // Ref to the controls, so that we can update them on every frame using useFrame
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
                    <Outline blur visibleEdgeColor="red" edgeStrength={100} width={500} />
                </EffectComposer>
                <Desk />
            </Selection>
        </Canvas>
    )
}