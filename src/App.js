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

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data);

    useEffect(() => {
      getRecipes();
    }, [query]);

    const updateSearch = (e) => {
      setSearch(e.target.value);
    };
    const getSearch = (e) => {
      e.preventDefault();
      setQuery(search);
      setSearch("");
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
        <Recipe />
      </div>
    );
  };
}
export default App;
