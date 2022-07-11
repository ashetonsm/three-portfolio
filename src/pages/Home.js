import { Canvas, extend } from "@react-three/fiber"
import { useState } from "react";
import Phone from '../components/models/Phone'
import Keyboard from '../components/models/Keyboard'
import Pen from '../components/models/Pen'

extend({ Phone, Keyboard, Pen})

export const Home = ({ props }) => {

    const [allItems, setAllItems] = useState([
        { name: 'Phone', position: [0, 0, 0]},
        { name: 'Keyboard', position: [2, 0, 0]},
        { name: 'Pen', position: [4, 0, 0]},
    ]);

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

    return (
        <>
        <div>
            {activeItem.name !== undefined ? activeItem.name : "Choose Your Weapon"}
        </div>
            <Canvas tabIndex={0} >
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

            <div>
                {activeItem.name !== undefined ? 
                
                activeItem.name === "Keyboard" ? "This is where I put my keyboards." :
                activeItem.name === "Pen" ? "This is where I put my pens." :
                activeItem.name === "Phone" ? "This is where I put my phones." :
                
                activeItem.name : ""}
            </div>
        </>
    )
}