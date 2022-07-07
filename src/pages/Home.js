import { Canvas } from "@react-three/fiber"
import { Box } from "../components/models/Box"
import { ButtonPlane } from "../components/UI/ButtonPlane";

export const Home = ({props}) => {

    const goLeft = () => {
        console.log("Left")
    }

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <ButtonPlane position={[-10, 0, 0]} />
            <ButtonPlane position={[10, 0, 0]} />
        </Canvas>
    )
}