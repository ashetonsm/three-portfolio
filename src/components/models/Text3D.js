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
            backgroundColor: '#ffffff80',
            width: '20vw',
            height: '100vh',
            overflowWrap: 'anywhere',
            textAlign: 'center',
            padding: 10,

          }}>
          <h1>
            {children[0]}
          </h1>
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