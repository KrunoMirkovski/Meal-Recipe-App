import "./App.css";
import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";

function App() {
  //Set up Edamam API credentials
  const APP_ID = "4f4742f4";
  const APP_KEY = "5b4d47477a6a4dc6e678474d5d55b429";
  //Create state variables
  const [recipes, setRecipes] = useState([]); //To store the list of the fetched recipes
  const [search, setSearch] = useState(""); //To track the user’s input in the search bar
  const [query, setQuery] = useState("pizza"); // Default query; To trigger the API call when the user submits a search.

  return (
    <div className="App">
      <h1>Meal Recipe App</h1>
      <Recipe />
    </div>
  );
}

export default App;
