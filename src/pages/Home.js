import { Canvas } from "@react-three/fiber"
import { Box } from "../components/models/Box"
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Button } from '@chakra-ui/react'

export const Home = ({props}) => {

    const goLeft = () => {
        console.log("Left")
    }


    return (
        <>
        <Button onClick={goLeft}> <FiArrowLeft /> </Button>
        <Button> <FiArrowRight /> </Button>
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
        </>
    )
}