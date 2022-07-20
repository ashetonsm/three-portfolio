import { useRef } from "react"
import { DoubleSide } from "three"

export const Box = (props) => {

    const ref = useRef()

    return (
        <mesh
            {...props}
            ref={ref}
        >
            <boxGeometry args={[10, 15, 10]} />
            <meshStandardMaterial color={'#b4dada'} side={DoubleSide}/>
        </mesh>
    )

}