import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
  // Define API credentials
  const APP_ID = "4f4742f4";
  const APP_KEY = "dbdea6d8b8c846e093802c5a472bc5a2";
  // State hooks to manage recipes, search term, and query
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(""); // Track the current search term
  const [query, setQuery] = useState("pasta"); // Default query set to "pasta"

  // Effect hook runs when the query changes, fetching recipes from the API
  useEffect(() => {
    console.log("Search query:", query); // Log the current search query
    getRecipes();
  }, [query]); // Runs whenever query changes

  const getRecipes = async () => {
    try {
      // Make a fetch request to the API with the query and credentials
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        {
          method: "GET",
          headers: {
            "Edamam-Account-User": "yourUserID", // Replace with your actual userID
          },
        }
      );
      // Check if the response was successful (status 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Parse the response JSON

      console.log("API Response Data:", data); // Log the API response data

      // Check if the API returned results, if not, log an error
      if (!data.hits || data.hits.length === 0) {
        console.error("No recipes found for the query:", query);
      }
      setRecipes(data.hits || []); // Ensure recipes is an array
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Update the search term whenever the input changes
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  // Trigger the API request when the search form is submitted
  const getSearch = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setQuery(search); // Update the query state with the search term
    setSearch(""); // Clear the search input
  };

  return (
    <div className="App">
      <h1>Meal Recipe App</h1>
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label} // Use recipe label as a unique key
              title={recipe.recipe.label} // Recipe title
              calories={recipe.recipe.calories} // Calories for the recipe
              image={recipe.recipe.image} // Recipe image URL
              ingredients={recipe.recipe.ingredients} // List of ingredients
            />
          ))
        ) : (
          <p>No recipes found. Try another search!</p>
        )}
      </div>
    </div>
  );
};

export default App;
