import React, { useState, useEffect } from 'react';
import RandomSprout from './RandomSprout';
import SproutsIndex from './SproutsIndex';
import LongestRecipe from './LongestRecipe';

const SproutsContainer = (props) => {
  const [recipe, setRecipe] = useState("")
  const [recipes, setRecipes] = useState([])
  const [longestRecipe, setLongestRecipe] = useState("")

  const getRandomRecipe = () => {
    fetch('/api/v1/random-recipe')
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      setRecipe(response)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const getAllRecipes = () => {
    fetch('/api/v1/recipes')
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      setRecipes(response)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const getLongestRecipe = () => {
    fetch('/api/v1/longest-recipe')
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      setLongestRecipe(response)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const handleRandomClick = () => {
    setRecipes([])
    setLongestRecipe("")
    getRandomRecipe();
  }

  const handleIndexClick = () => {
    setRecipe("")
    setLongestRecipe("")
    getAllRecipes();
  }

  const handleLongestClick = () => {
    setRecipe("")
    setRecipes([])
    getLongestRecipe();
  }

  return(
    <div className="container">
      <h1>Sprout Fetcher</h1>
      <RandomSprout
        recipe={recipe}
      />
      <SproutsIndex
        recipes={recipes}
      />
      <LongestRecipe
        longestRecipe={longestRecipe}
      />

      <div className="buttons">
        <button onClick={handleRandomClick} className="btn">Get Random Recipe</button>

        <button onClick={handleIndexClick} className="btn">See All Recipes</button>

        <button onClick={handleLongestClick} className="btn">Get Longest Recipe</button>
      </div>
    </div>
  )
}

export default SproutsContainer;
