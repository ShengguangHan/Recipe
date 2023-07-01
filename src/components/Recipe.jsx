import React from 'react'
import Instructions from './Instructions'
import Ingredients from './Ingredients'
import { RecipeContext } from './App.jsx'

export default function Recipe(props) {

  const {handleRecipeDel, handleRecipeSelect} = React.useContext(RecipeContext)

  const {
    id,
    name,
    servings,
    cookTime,
    instructions,
    ingredients
  } = props

  return (
    <div className='recipe'>
      {/* Header */}
      <div className='recipe__header'>
        <h3 className='recipe__title'>{name}</h3>
        <div>
        <button className='btn btn--primary mr-1' onClick={() => handleRecipeSelect(id)}>Edit</button>
        <button className='btn btn--danger mr-1' onClick={() => handleRecipeDel(id)}>Delete</button>
        </div>
      </div>
      {/* Info */}
      <div className='recipe__row'>
        <span className='recipe__label'>Cook Time:</span>
        <span>{cookTime}</span>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Servings:</span>
        <span>{servings}</span>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Instructions:</span>
        <div className='recipe__value recipe__instructions'>
          {<Instructions instructions={instructions} />}
        </div>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Ingredients</span> 
        <div className='recipe__value recipe__ingredients'>
        {<Ingredients ingredients={ingredients} />}
        </div>
      </div>
    </div>
  )
}
