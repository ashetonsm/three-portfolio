/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef, useState } from "react"
import { useFrame } from '@react-three/fiber'
import { useGLTF } from "@react-three/drei"
import { useSpring, animated, config } from "@react-spring/three"

export default function Model({ ...props }) {
  const group = useRef();
  const [hovered, hover] = useState(false)
  const [active, setActive] = useState(false)
  const { nodes, materials } = useGLTF("models/Keyboard.gltf")

  useFrame((state, delta) => (group.current.rotation.y += 0.01))

  const handleClick = (obj) => {
      setActive(true)
      obj.parent.position.set(0, 0, 0)
      props.onActive(obj)
  }

  const makeInactive = () => {
      setActive(false)
  }

  const { scale } = useSpring({
      scale: active ? 1.5 : 1,
      config: config.gentle
    })

  return (
    <group ref={group} {...props} dispose={null}>
      <animated.mesh
        ref={group}
        castShadow
        receiveShadow
        geometry={nodes.Keyboard.geometry}
        material={nodes.Keyboard.material}


        makeInactive={(event) => makeInactive()}
        onClick={(event) => handleClick(event.object)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      />
    </group>
  );
}

useGLTF.preload("/Keyboard.gltf");