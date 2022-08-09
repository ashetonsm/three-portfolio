import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import React, { useRef, useEffect, useState } from 'react'
import { Html, useCursor } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

export const NavBar = (props) => {

  const GOLDENRATIO = 1.61803398875
  let q = new THREE.Quaternion()
  let p = new THREE.Vector3()

  const links = [
    { linkText: "GitHub", url: "https://github.com/ashetonsm" },
    { linkText: "Resumé", url: "https://www.dropbox.com/s/gplszprw31msqja/Mayfield_A_Resume_R.pdf?dl=0" },
    { linkText: "Itch.io", url: "https://nnneato.itch.io/" },
    { linkText: "ArtStation", url: "https://artstation.com/ashetonsm" },
  ]

  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const ref = useRef()

  const screens = useRef()
  let drawer = useRef()

  const bigMonitor = useRef()
  const smallMonitor = useRef()
  const keyboard = useRef()
  const tablet = useRef()

  // Initial position
  p.set(0, 1.5, 2)
  q.identity()

  const setCoordinates = (keyword) => {

    switch (keyword) {
      case "GitHub": {
        console.log(keyword)
        bigMonitor.current.children[0].updateWorldMatrix(true, true)
        bigMonitor.current.children[0].localToWorld(p.set(0, GOLDENRATIO / 7, 0.5))
        bigMonitor.current.children[0].getWorldQuaternion(q)
        props.onSelect(keyword, "https://github.com/ashetonsm")
        drawer.current.toggleDrawer(true)
        screens.current.handleTexture(2)
        break
      }
      case "Resumé": {
        drawer.current.toggleDrawer(true)
        console.log(keyword)
        smallMonitor.current.children[0].updateWorldMatrix(true, true)
        smallMonitor.current.children[0].localToWorld(p.set(0, GOLDENRATIO / 7, 0.5))
        smallMonitor.current.children[0].getWorldQuaternion(q)
        screens.current.handleTexture(0)
        props.onSelect(keyword, "https://www.dropbox.com/s/gplszprw31msqja/Mayfield_A_Resume_R.pdf?dl=0")
        break
      }
      case "Itch.io": {
        drawer.current.toggleDrawer(true)
        console.log(keyword)
        keyboard.current.children[0].updateWorldMatrix(true, true)
        keyboard.current.children[0].localToWorld(p.set(0, GOLDENRATIO / 7, 0.5))
        keyboard.current.children[0].getWorldQuaternion(q)
        screens.current.handleTexture(3)
        props.onSelect(keyword, "https://nnneato.itch.io/")
        break
      }
      case "ArtStation": {
        drawer.current.toggleDrawer(true)
        console.log(keyword)
        tablet.current.children[0].updateWorldMatrix(true, true)
        tablet.current.children[0].localToWorld(p.set(0, GOLDENRATIO / 7, 0.5))
        tablet.current.children[0].getWorldQuaternion(q)
        screens.current.handleTexture(1)
        props.onSelect(keyword, "https://artstation.com/ashetonsm")
        break
      }
      default: {
        drawer.current.toggleDrawer(false)
        console.log("Link not found.")
        screens.current.handleTexture()
      }
    }
  }

  useEffect(() => {
    bigMonitor.current = ref.current.parent.getObjectByProperty("friendlyName", "BigMonitor")
    smallMonitor.current = ref.current.parent.getObjectByProperty("friendlyName", "SmallMonitor")
    keyboard.current = ref.current.parent.getObjectByProperty("friendlyName", "Keyboard")
    tablet.current = ref.current.parent.getObjectByProperty("friendlyName", "Tablet")
    screens.current = ref.current.parent.getObjectByName("Screens")
    drawer.current = ref.current.parent.getObjectByName("TextDrawer")
  })

  useFrame((state) => {
    state.camera.position.lerp(p, 0.025)
    state.camera.quaternion.slerp(q, 0.025)
  })

  return (
    <animated.mesh
      ref={ref}
      position={[0, 0, 0]}
      name="NavBar">

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
          }}
        >

          {links.map((linkItem) =>
            <h1
              key={linkItem.linkText}
              style={{
                color: '#FFFFFF',
              }}
              onClick={() => setCoordinates(linkItem.linkText)}
            >
              {linkItem.linkText}
            </h1>
          )}

        </div>
      </Html>
    </animated.mesh>
  )
}