import React, { useRef } from 'react'
import { Html, Text } from '@react-three/drei'

export const Text3D = ({ children, props }) => {
  const ref = useRef()

  return (
    <Text
      ref={ref}
      {...props}
      position={[]}
    >
      <Html {...props}
        color='#000'
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            width: '100vw',
            textAlign: 'center',
            padding: 10,

          }}>
          <p>
            {children[0]}
          </p>
          <p>
            <a
              href={children[1]}
              target="_blank"
              rel="noreferrer noopener"
            >{children[1]}
            </a>
          </p>
        </div>
      </Html>
    </Text>
  )
}