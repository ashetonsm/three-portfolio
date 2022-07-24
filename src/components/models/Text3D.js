import React, { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

export const Text3D = ({ children, props }) => {
  const ref = useRef()

  function RenderText() {
    const { position } = useSpring({
      to: {
        position: [0, 0, 0]
      },
      from: { position: [-5, 0, 0] },
      config: { mass: 2, tension: 500, friction: 100 }
    })

    return (
      <animated.mesh
        ref={ref}
        position={position}>

        <Html {...props}
          color='#000'>
          <div
            style={{
              backgroundColor: '#ffffff80',
              position: 'absolute',
              left: '-50vw',
              top: '-30vh',
              width: '30vw',
              height: '100vh',
              overflowWrap: 'anywhere',
              textAlign: 'center',
              padding: 5,

            }}>
            <h1>
              {children[0]}
            </h1>
            <p>
              <a
                href={children[1]}
                target="_blank"
                rel="noreferrer noopener"
              >
                {children[1]}
              </a>
            </p>
          </div>
        </Html>
      </animated.mesh>
    )
  }

  return (
    <RenderText />
  )
}