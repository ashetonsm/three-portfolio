import { Canvas, extend, useThree, useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useState, useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Phone from '../components/models/Phone'
import Keyboard from '../components/models/Keyboard'
import Pen from '../components/models/Pen'
import { FiTerminal, FiBox, FiPenTool } from 'react-icons/fi'
import { Text3D } from "../components/models/Text3D"

extend({ Phone, Keyboard, Pen, OrbitControls })

export const Home = ({ props }) => {

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window
        return {
            width,
            height
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const allItems = [
        { name: 'Pen', position: [-10, 0, 0] },
        { name: 'Phone', position: [0, 0, 0] },
        { name: 'Keyboard', position: [10, 0, 0] },
    ]

    const featureList = [ 
        {text: '3D Art', icon: FiBox}, 
        {text: 'Programming', icon: FiTerminal}, 
        {text: 'Pattern Illustration', icon: FiPenTool}
    ]

    const [activeItem, setActiveItem] = useState({})

    const makeActive = (obj) => {
        // The Group that this Mesh is nested in. obj.children[0] would be the mesh.
        setActiveItem(obj.parent)

        // The parent of this group (the canvas)
        //console.log(obj.parent.parent.children)

        // Find the meshes that need to be marked inactive
        // Compare the group UUIDs
        const inactiveMeshes = obj.parent.parent.children.filter((child) => child.type === 'Group' && child.uuid !== obj.parent.uuid);
        removeActive(inactiveMeshes)
    }

    const removeActive = (objList) => {
        objList.forEach(mesh => {
            mesh.children[0].makeInactive()
            mesh.position.set(mesh.position.x, 0, 0)
        });
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const CameraControls = () => {
        // Get a reference to the Three.js Camera, and the canvas html element.
        // We need these to setup the OrbitControls component.
        // https://threejs.org/docs/#examples/en/controls/OrbitControls
        const {
          camera,
          gl: { domElement },
        } = useThree();

        console.log(camera)
        // Ref to the controls, so that we can update them on every frame using useFrame
        const controls = useRef();
        useFrame((state) => controls.current.update());
        return <orbitControls ref={controls} args={[camera, domElement]} />;
      };

    return (
        <>
                <div>
                    {activeItem.name !== undefined ?

                        activeItem.name === "Keyboard" ? <a 
                            href="https://github.com/ashetonsm" target={'_blank'}  rel="noreferrer noopener">
                            GITHUB
                        </a> :
                        activeItem.name === "Pen" ? <a 
                            href="https://www.artstation.com/ashetonsm" target={'_blank'}  rel="noreferrer noopener">
                            ARTSTATION
                        </a> :
                        activeItem.name === "Phone" ? <a 
                            href="/" target={'_blank'} rel="noreferrer noopener">
                            CONTACT
                        </a> :

                        activeItem.name : <a disabled>Please choose an option:</a>}
                </div>

                <div>
                    <Text3D>This is a text that would be 3d looking</Text3D>
                </div>

            <Canvas style={{ height: 500 }} >
                <CameraControls/>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                {allItems.map((item) => (
                    item.name === "Keyboard" ?
                        <Keyboard key={item.name} position={item.position} onActive={makeActive} name={item.name} /> :

                    item.name === "Pen" ?
                        <Pen key={item.name} position={item.position} onActive={makeActive} name={item.name} /> :

                    item.name === "Phone" ?
                        <Phone key={item.name} position={item.position} onActive={makeActive} name={item.name} /> :

                        null
                ))}
            </Canvas>
        </>
    )
}