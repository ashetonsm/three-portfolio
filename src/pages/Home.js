import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react";
import { Box } from "../components/models/Box"
import { ButtonPlane } from "../components/UI/ButtonPlane";

export const Home = ({ props }) => {


    const [allItems, setAllItems] = useState([
        { name: 'box0', position: [0, 0, 0], color: '#ff82d9' },
        { name: 'box1', position: [2, 0, 0], color: '#00ff0d' },
        { name: 'box2', position: [4, 0, 0], color: '#0051ff' },
        { name: 'box3', position: [6, 0, 0], color: '#ff4343' },
    ]);

    const [activeItem, setActiveItem] = useState({})

    const makeActive = (obj) => {
        setActiveItem(obj)
        // console.log(obj.parent.children)
        // console.log(obj)

        // Find the meshes that need to be marked inactive
        const inactiveMeshes = obj.parent.children.filter((child) => child.type === 'Mesh' && child.uuid !== obj.uuid);
        removeActive(inactiveMeshes)
    }

    const removeActive = (objList) => {
        let increment = 2;
        objList.forEach(mesh => {
            mesh.position.set(increment, 0, 0)
            increment = increment + 2
        });
    }

    return (
        <>
        <div>
            {activeItem.name !== undefined ? activeItem.name : "No active item"}
        </div>
            <Canvas tabIndex={0} >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                {allItems.map((item) => (
                    <Box key={item.name} position={item.position} color={item.color} onActive={makeActive} name={item.name} />
                ))}
            </Canvas>
        </>
    )
}