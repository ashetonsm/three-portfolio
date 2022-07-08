import { useEffect, useState, useRef } from "react"
import { useFrame } from '@react-three/fiber'

export const Box = (props) => {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))

    // useEffect(() => {
    //     if (props.name === props.activeItem.name) {
    //         console.log("Active matches this box's name")
    //     }
    // });

    const report = () => {
        console.log("This item's name is: " + "" + "\nThe active item's name is: " + "")
    }

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => report()}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )

}