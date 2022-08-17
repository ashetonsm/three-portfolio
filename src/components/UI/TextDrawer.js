import React, { useRef } from 'react'
import { Html } from '@react-three/drei'

export const TextDrawer = ({ children, props }) => {
  const ref = useRef()

  function RenderText() {

    return (
      <mesh
        ref={ref}
        name="TextDrawer"
      >
        <Html {...props}
          color='#000'
          style={{
            // backgroundColor: '#ffffff80',
            position: 'absolute',
            top: '-70vh',
            left: '-50vw',
            width: '100vw',
            height: '20vh',
            overflowWrap: 'anywhere',
            textAlign: 'center',
            padding: 5,
          }}
        >
          <h1 style={{
            fontSize: '4vmin',
          }}>
            {children[0]}
          </h1>
          <h2>
            <a
              href={children[1]}
              target="_blank"
              rel="noreferrer noopener">
              {children[1]}
            </a>
          </h2>
        </Html>
      </mesh>
    )
  }

  return (
    <RenderText />
  )
}