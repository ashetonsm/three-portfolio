import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'

export const Text3D = ({children}) => {
    const [size, set] = useState(0.5)
    const [hidden, setVisible] = useState(false)
    return (
        <mesh scale={size * 2}>
        <meshStandardMaterial />
        <Html
          style={{
            transition: 'all 0.2s',
            opacity: hidden ? 0 : 1,
            transform: `scale(${hidden ? 0.5 : 1})`
          }}
          distanceFactor={1.5}
          position={[0, 1, 0]}
          transform
          occlude
          onOcclude={setVisible}>
          <span>{children}</span>
        </Html>
      </mesh>    
      )
}