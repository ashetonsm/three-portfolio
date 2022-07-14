import React, { useState, useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export const Text3D = ({ children, props }) => {
  const [size, set] = useState(0.5)
  const [hidden, setVisible] = useState(false)
  const ref = useRef()
  useFrame(({ camera }) => ref.current.quaternion.copy(camera.quaternion))

  return (
    <mesh ref={ref} scale={size * 2} >
      <Html
        style={{
          transition: 'all 0.2s',
          opacity: hidden ? 0 : 1,
          transform: `scale(${hidden ? 0.5 : 1})`
        }}
        distanceFactor={5}
        position={[0, 1, 0]}
        transform
        occlude
        onOcclude={setVisible}>
        <span>{children}</span>
      </Html>
    </mesh>
  )
}