import React from 'react'

export default function RecipeEditInstructions(props) {
  const {
    index,
    insruction,
    handleInstructionsChange,
    handleInstructionsDelete,
  } = props

  function handleChange(newStrings) {
    handleInstructionsChange(index, newStrings)
  }

  return (
    <div className='recipe-edit_instruction-item'>
      <input type="text" className='recipe-edit_input' value={insruction} onChange={e => handleChange(e.target.value)}></input>
      <button className='btn btn--danger instruction-delete-btn' onClick={() => handleInstructionsDelete(index)}>&times;</button>
    </div>
  )
}
