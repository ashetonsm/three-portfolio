import React, { useState, useRef } from 'react'
import { Html, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export const Text3D = ({ children, props }) => {
  const [size, set] = useState(0.5)
  const [hidden, setVisible] = useState(false)
  const ref = useRef()
  useFrame(({ camera }) => ref.current.quaternion.copy(camera.quaternion))

  return (
    <mesh ref={ref} scale={size * 2} >
      <Text
        color='#000'
        fontSize={0.2}
        position={[0, 2, 0]}
      >
        {children[0]}
      </Text>

      <Html {...props}
        style={{
          transition: 'all 0.2s',
          opacity: hidden ? 0 : 1,
          transform: `scale(${hidden ? 0.5 : 1})`
        }}
        distanceFactor={5}
        position={[0, 1.8, 0]}
        transform
        occlude
        onOcclude={setVisible}>
        <a
          href={children[1]}
          target="_blank"
          rel="noreferrer noopener"
        >{children[1]}</a>
      </Html>
    </mesh>
  )
}