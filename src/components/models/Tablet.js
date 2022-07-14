import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

    const [hovered, hover] = useState(null)
    const group = useRef();
    console.log(hovered);

    const { nodes, materials } = useGLTF("models/PortfolioObjects.gltf");

    return (
        <group ref={group} {...props} dispose={null} >

</group>
            )

}

            useGLTF.preload("/PortfolioObjects.gltf");