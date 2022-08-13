import React from 'react'

export const NavBar = (props) => {

  return (
      <button 
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textDecoration: 'underline',
        display: 'inline',
        fontSize: '1.25em',
      }}
      onClick={(e) => props.sendMessage(props.name, props.linkText, props.url)}>
        {props.linkText}
      </button>
  )
}