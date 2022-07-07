import { Canvas } from "@react-three/fiber"
import { useState } from "react";
import { Box } from "../components/models/Box"
import { ButtonPlane } from "../components/UI/ButtonPlane";

export const Home = ({ props }) => {

    const [allItems, setAllItems] = useState([
        {name: 'box1', position:[-1.2, 0, 0]},  {name: 'box2', position:[1.2, 0, 0]}
    ]);

    const addItemHandler = (newItem) => {
        setAllItems((currentItems) => [
            ...currentItems, {
                obj: newItem, id: Math.random().toString()
            }
        ]);
    }

    const goLeft = () => {
        console.log("Left")
    }

    const goRight = () => {
        console.log("Right")
    }

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />

            {allItems.map((item) => (
                <Box key={item.name} position={item.position} />
            ))}

            <ButtonPlane position={[-10, 0, 0]} handleClick={goLeft} />
            <ButtonPlane position={[10, 0, 0]} handleClick={goRight} />
        </Canvas>
    )
}