import React, { useRef, useState } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model({ ...props }) {

  const group = useRef()
  const { nodes, materials } = useGLTF("models/Desk.gltf")

  return (
    <group
      ref={group}
      {...props}
      dispose={null}>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Desk.geometry}
        material={materials.DeskWood}
      />
    </group>
  )
}

useGLTF.preload("/Desk.gltf")
