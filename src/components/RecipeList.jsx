import React from 'react'
import Recipe from './Recipe.jsx'
import { useContext } from 'react'
import { RecipeContext } from './App.jsx'

export default function RecipeList(props) {
  const { recipes } = props
  const { handleRecipeAdd } = useContext(RecipeContext)
  return (
    <div className='recipe-list'>
      <div>
        {
          recipes.map(recipe =>
            <Recipe key={recipe.id} {...recipe} />
          )
        }
      </div>

      <div className='recipe-list__add-recipe-btn-container'>
        <button onClick={handleRecipeAdd} className='btn btn--primary'>Add Recipe</button>
      </div>
    </div>
  )
}
