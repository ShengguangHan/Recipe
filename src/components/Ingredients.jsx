import React from 'react'

export default function Ingredients(props) {
  const { ingredients } = props
  return (
    <div className='ingredient-grid'>
      {ingredients ? ingredients.map((ingredient, index) => (
        <React.Fragment key={index}>
        <span>{ingredient.name}</span>
        <span>{ingredient.amount}</span>
        </React.Fragment>
      )) : null}
    </div>
  )
}
