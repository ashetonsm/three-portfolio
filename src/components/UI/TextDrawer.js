import React, { useRef } from 'react'
import { Html } from '@react-three/drei'

export const TextDrawer = ({ children, props }) => {
  const ref = useRef()

  function RenderText() {

    return (
      <mesh
        ref={ref}
        position={[0, 0, 0]}
        name="TextDrawer" >

        <Html {...props}
          color='#000'>
          <div
            style={{
              backgroundColor: '#ffffff80',
              position: 'absolute',
              left: '-50vw',
              top: '20vh',
              width: '100vw',
              height: '20vh',
              overflowWrap: 'anywhere',
              textAlign: 'center',
              padding: 5,

            }}>
            <h1 style={{
              fontSize: '2em',
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
          </div>
        </Html>
      </mesh>
    )
  }

  return (
    <RenderText />
  )
}