import React, { useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

export const Text3D = ({ children, props }) => {
  const ref = useRef()
  const [showDrawer, setShowDrawer] = useState(false)

  const toggleDrawer = (newState) => {
    setShowDrawer(newState)
  }

  function RenderText() {
    const { position } = useSpring({
      to: {
        position:
          showDrawer ? [0, 0, 0] :
            !showDrawer && children[0] === undefined ?
              [-5, 0, 0] : [-5, 0, 0]
      },
      from: {
        position:
          showDrawer ? [-5, 0, 0] :
            !showDrawer && children[0] === undefined ?
              [-5, 0, 0] : [0, 0, 0]
      },
      config: showDrawer ? { mass: 2, tension: 500, friction: 100 } :
        { mass: 2, tension: 200, friction: 500 }
    })

    return (
      <animated.mesh
        ref={ref}
        position={position}
        toggleDrawer={toggleDrawer}
        name="Text3D" >

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