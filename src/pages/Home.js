import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react";
import { Box } from "../components/models/Box"
import { ButtonPlane } from "../components/UI/ButtonPlane";

export const Home = ({ props }) => {


    const [allItems, setAllItems] = useState([
        { name: 'box1', position: [-1.2, 0, 0] },
        { name: 'box2', position: [1.2, 0, 0] }
    ]);

    // useEffect(() => {
    //   console.log("UseEffect")
    // }, [])


    const [activeItem, setActiveItem] = useState(allItems.at(0))
    let currentItem = 0;
    let totalItems = allItems.length;

    const goLeft = () => {

    }

    const goRight = () => {

    }


    return (
        <>
            <div>
                {activeItem.name}
            </div>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                {allItems.map((item) => (
                    <Box key={item.name} position={item.position} activeItem={allItems.at(currentItem)} />
                ))}

                <ButtonPlane position={[-10, 0, 0]} handleClick={goLeft} />
                <ButtonPlane position={[10, 0, 0]} handleClick={goRight} />
            </Canvas>
        </>
    )
}