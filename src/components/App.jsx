import { v4 as uuidV4 } from 'uuid';
import { useState, createContext } from 'react';
import RecipeList from './RecipeList';
import React from 'react';
import RecipeEdit from './RecipeEdit';

const LOCAL_STORAGE_KEY = "cookingWithReact.recipes"

import "../style/app.scss"

const sampleRecipes = [
  {
    id: uuidV4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions: [
      "1. Put salt on Chicken",
      "2. Put chicken in oven",
      "3. Eat chicken"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: [
      "1. Put paprika on Pork",
      "2. Put pork in oven",
      "3. Eat pork"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Apple Pai",
    servings: 10,
    cookTime: "3:45",
    instructions: [
      "1. Put apples in pie",
      "2. Put pie in oven",
      "3. Eat pie"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
]

export const RecipeContext = createContext()

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    // 新增的菜单会被保存在页面上
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)

    if(recipeJSON) {
      return JSON.parse(recipeJSON)
    }else {
      return sampleRecipes
    }
  })

  //EDIT 选中的recipe 的 ID
  const [selectRecipeId, setSelectRecipeId] = useState()

  // 新增的菜单会被保存在页面上
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  //Add Recipe
  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidV4(),
      name: "New Name",
      servings: 1,
      cookTime: "1:00",
      instructions: [
        "1. xxx",
        "2. yyy",
      ],
      ingredients: [
        {
          id: uuidV4(),
          name: "name",
          amount: "amount"
        }
      ]
    }
    setRecipes([...recipes, newRecipe])
  }

  //Delete Recipe 通过ID比较进行删除
  function handleRecipeDel(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  //select recipe
  function handleRecipeSelect(id) {
    setSelectRecipeId(id)
  }

  function handleRecipeChange(id, recipe) { // ID是你要换掉哪一个 recipe 是新的内容
    const newRecipes = [...recipes];// copy recipes to new arrray

    const index = newRecipes.findIndex(r => r.id === id);// find index of recipe

    newRecipes[index] = recipe;// replace recipe at index with new recipe

    setRecipes(newRecipes);
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDel,
    handleRecipeSelect,
    handleRecipeChange
  }

  return (<>
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {/* EDIT选中的 Recipe */}
      {selectRecipeId && <RecipeEdit recipe={recipes.find(recipe => recipe.id === selectRecipeId)} />}
    </RecipeContext.Provider>
  </>);
}

