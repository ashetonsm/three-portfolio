import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Select } from '@react-three/postprocessing'

export default function Model({ ...props }) {

  const [hovered, hover] = useState(null)
  const [active, setActive] = useState(false)

  const group = useRef();

  const { nodes, materials } = useGLTF("models/PortfolioObjects.gltf");

  const handleClick = (obj) => {
    if (!active === false) {
      props.onInactive()
    } else {
      props.onActive(obj)
    }
    setActive(!active)
  }

  const hovering = (obj) => {
    hover(true)
    props.onHover(obj)
  }

  const notHovering = (obj) => {
    if (!active) {
      hover(false)
    }
    props.onExitHover(obj)
  }

  return (
    <group ref={group} {...props} dispose={null} name="Debug Desk" >

      <Select enabled={hovered}>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Table_Top.geometry}
          material={materials.Wood}
          onPointerOver={(event) => hovering(event.object.parent.parent)}
          onPointerOut={(event) => notHovering()}
          onClick={(event) => handleClick(event.object.parent.parent)}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.All_Legs.geometry}
            material={materials.Wood}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SupportsL.geometry}
              material={materials.Wood}
              position={[0.29, 0, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.SupportsR.geometry}
              material={materials.Wood}
              position={[-0.48, -0.27, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Tray1L.geometry}
              material={materials.Wood}
              position={[0.33, -0.27, 0]}
            />
          </mesh>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Desk_Rim.geometry}
            material={materials.Wood}
            position={[0, 0.38, -0.22]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.SupportBack.geometry}
            material={materials.Wood}
            position={[-0.15, -0.27, -0.21]}
            rotation={[0, 1.57, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tray2R.geometry}
            material={materials.Wood}
            position={[-0.35, -0.23, -0.08]}
            rotation={[0, -Math.PI / 4, 0]}
          />
        </mesh>
      </Select>
    </group>
  )
}

useGLTF.preload("/PortfolioObjects.gltf");