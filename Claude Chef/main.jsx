import React from "react"
import ClaudeRecipe from "./recipies.jsx"
import IngredientsList from "./ingredientsList"
import { getRecipeFromGemini } from "./ai.js"
export default function Main(){
    const [ingredients,setlistingredients] = React.useState([])
    const ingredientListItems = ingredients.map(ingredient=>(
        <li key={ingredient}>{ingredient}</li>))

        const [recipe,setrecipe] = React.useState("");
       async function getrecipe(){
            const recipeMarkdown = await getRecipeFromGemini(ingredients)
        setrecipe(recipeMarkdown)
        }
       function addIngredients(formData){
            const newIngredient = formData.get("ingredient")
                  setlistingredients(
            previngredients=>[
                ...previngredients,newIngredient])
            }

        return(
        <main>
            <form action ={addIngredients} className="form">
                <input type="text" 
                placeholder="e.g. oregano"
                name = "ingredient"/>
                <button>+ Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ili={ingredientListItems}
            i={ingredients} getrecipe={getrecipe}
            />}
          {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}