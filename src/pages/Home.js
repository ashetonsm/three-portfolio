import { Canvas, extend, useThree } from "@react-three/fiber"
import { useEffect, useState } from "react"
import { Container, Button } from '@chakra-ui/react'
import Phone from '../components/models/Phone'
import Keyboard from '../components/models/Keyboard'
import Pen from '../components/models/Pen'
import SplitWithImage from "../components/UI/Feature.tsx"
import { FiTerminal, FiBox, FiPenTool } from 'react-icons/fi'

extend({ Phone, Keyboard, Pen })

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
        { name: 'Pen', position: [-(windowDimensions.width - (windowDimensions.width + 1) * 1.003), 0, -1] },
        { name: 'Phone', position: [0, 0, -1] },
        { name: 'Keyboard', position: [(windowDimensions.width - (windowDimensions.width + 1) * 1.003), 0, -1] },
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
            mesh.position.set(mesh.position.x, 0, -1)
        });
    }

    const goToLink = (destination) => {
        window.open(destination)
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
        <Container maxW='container.sm' centerContent>
            <SplitWithImage header="Hi, I'm Asheton" subHeader="I do many things:" imgUrl="https://placekitten.com/500/400" features={featureList}/>
        </Container>

            <Container centerContent>
                <div>
                    {activeItem.name !== undefined ?

                        activeItem.name === "Keyboard" ? <Button
                            colorScheme='yellow'
                            variant='solid'
                            onClick={(e) => { goToLink(e.target.value) }}
                            value="https://github.com/ashetonsm">
                            GITHUB
                        </Button> :
                        activeItem.name === "Pen" ? <Button
                            colorScheme='yellow'
                            variant='solid'
                            onClick={(e) => { goToLink(e.target.value) }}
                            value="https://www.artstation.com/ashetonsm">
                            ARTSTATION
                        </Button> :
                        activeItem.name === "Phone" ? <Button
                            colorScheme='yellow'
                            variant='solid'
                            onClick={(e) => { goToLink(e.target.value) }}
                            value="/">
                            CONTACT
                        </Button> :

                        activeItem.name : <Button disabled>Please choose an option:</Button>}
                </div>
            </Container>

            <Canvas style={{ height: 500 }} tabIndex={0} >
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