import React, { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { a, useTransition, useSpring } from '@react-spring/three'

export const Text3D = ({ children, props }) => {
  const ref = useRef()
  useFrame(({ camera }) => ref.current.quaternion.copy(camera.quaternion))


  return ( console.log(ref.current),
    <mesh
      ref={ref}
      scale={0}
      {...props}>

      <Html {...props}
        distanceFactor={3}
        color='#000'
      >
        <div         
        style={{
          'backgroundColor': '#ffffff',
          'borderRadius' : 10,
          'width' : '100%',
          'paddingLeft': '50%',
          'paddingRight': '50%',
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
    </mesh>
  )
}