import React from 'react'

export default function Instructions(props) {
  const {instructions } = props
  return (
    <>
      {instructions ? instructions.map((instruction, index)=> (
        <span key={index}>
          {instruction}
        </span>
      )): null}
    </>
  )
}
