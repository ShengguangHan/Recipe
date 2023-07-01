import React from 'react'
import { useContext } from 'react'
import { RecipeContext } from './App.jsx'
import RecipeEditInstructions from './RecipeEditInstructions.jsx'
import RecipeEditIngredient from './RecipeEditIngredient.jsx'
import {v4 as uuidV4} from 'uuid';

export default function RecipeEdit(props) {

  const { recipe } = props

  const { handleRecipeSelect, handleRecipeChange } = useContext(RecipeContext)

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes })
  }

  function handleInstructionsChange(index, newStrings) {
    const newInstructions = [...recipe.instructions]
    newInstructions[index] = newStrings
    handleChange({ instructions: newInstructions })
  }

  function handleInstructionsDelete(index) {
    handleChange({ instructions: recipe.instructions.filter((_, i) => i !== index) })
  }

  function handleInstructionsAdd() {
    handleChange({ instructions: [...recipe.instructions, ''] })
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients]
    const index = newIngredients.findIndex(i => i.id ===id)
    newIngredients[index] = ingredient
    handleChange({ ingredients: newIngredients})
  }

  function handelIngredientDelete(id) {
    handleChange({ ingredients: recipe.ingredients.filter(i => i.id !==id)})
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidV4(),
      name: "",
      amount: ""
    }
    handleChange({ ingredients: [...recipe.ingredients, newIngredient]})
  }

  React.useEffect(() => {

  }, [recipe])

  return (
    <div className='recipe-edit'>
      {/* 关闭按钮 */}
      <div className='recipe-edit_remove-button-container'>
        <button className='btn recipe-edit_remove-button' onClick={() => handleRecipeSelect(undefined)}>&times;</button>
      </div>

      {/* 内容 */}
      <div className='recipe-edit_details-grid'>
        {/* name */}
        <label htmlFor="name" className='recipe-edit_label'>Name</label>
        <input type="text" name='name' id='name' className='recipe-edit_input' value={recipe.name} onChange={e => handleChange({ name: e.target.value })} />

        {/* cook time */}
        <label htmlFor="cookTime" className='recipe-edit_label'>Cook Time</label>
        <input type="text" name='cookTime' id='cookTime' className='recipe-edit_input' value={recipe.cookTime} onChange={e => handleChange({ cookTime: e.target.value })} />

        {/* Servings */}
        <label htmlFor="servings" className='recipe-edit_label'>Servings</label>
        <input type="number" min='1' name='servings' id='servings' className='recipe-edit_input' value={recipe.servings} onChange={e => handleChange({ servings: parseInt(e.target.value) || '' })} />
      </div>

      <br />
      {/* instructions */}
      <label htmlFor="instructions" className='recipe-edit_label'>Instructions</label>
      <div className='recipe-edit_instruction-flex'>
        {
          recipe.instructions.map((instructions, index) => (
            <RecipeEditInstructions key={index} instructions={instructions} index={index} handleInstructionsChange={handleInstructionsChange} handleInstructionsDelete={handleInstructionsDelete} />
          ))
        }
      </div>
      <div className='recipe-edit_add-container'>
        <button className='btn btn--primary' onClick={() => handleInstructionsAdd()}>Add Instructions</button>
      </div>

      <br />
      {/* ingredients */}
      <label className='recipe-edit_label'>Ingredients</label>
      <div className='recipe-edit_ingredient-grid'>
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {
          recipe.ingredients.map((ingredient, index) => (
            <RecipeEditIngredient key={index} ingredient={ingredient} 
            handleIngredientChange={handleIngredientChange} 
            handleIngredientDelete={handelIngredientDelete}>
            </RecipeEditIngredient>
          ))
        }
      </div>
      <div className='recipe-edit_add-container'>
      <button className='btn btn--primary' onClick={() => handleIngredientAdd()}>Add Ingredient</button>
      </div>
    </div>
  )
}
