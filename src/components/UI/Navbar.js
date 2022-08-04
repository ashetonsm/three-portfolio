import React, { useRef, useState } from 'react'
import { Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

export const NavBar = ({ children, props }) => {

  const ref = useRef()

    return (
      <animated.mesh
        ref={ref}
        position={[0, 0, 0]}
        name="NavBar" >

        <Html {...props}
          color='#000'>
          <div
            style={{
              backgroundColor: '#00000080',
              position: 'absolute',
              left: '30vw',
              top: '-50vh',
              width: '20vw',
              height: '100vh',
              overflowWrap: 'anywhere',
              textAlign: 'center',
              paddingTop: '30vh',
            }}>
                {children}
          </div>
        </Html>
      </animated.mesh>
    )
  }