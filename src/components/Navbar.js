import React from "react";
import { useEffect, useRef, useState } from "react";
import logo from "../logos/logo-rec.png";
const Navbar = (props) => {
  // const [results, setResults] = useState([]);

  const queryRef = useRef("");
  //this function is called whenever the search input field changes. It updates the searchKey state variable with the value of the input field.
  const handleInputChange = (e) => {
    props.setSearchKey(e.target.value);
    e.preventDefault();
  };

  //  this function is called whenever the searchKey state variable changes. It performs a search with the current search query.
  useEffect(() => {
    queryRef.current = props.searchKey;
    // Perform the search whenever the query changes
    props.onTypingResults(props.searchKey);
  }, [props.searchKey]);

  //this function is called when the user clicks on the "X" button next to the search input field. It clears the search query and resets the input field.
  const clearSearch = (e) => {
    queryRef.current = "";
    e.preventDefault();
    props.setSearchKey("");
  };

  //: this function is called when the user clicks on a search result in the search results list. It selects the clicked search result and performs a search with the selected search result.
  const navListClick = (something) => {
    props.selectMovie(something);
    props.setSearchKey("");
    props.searchMovies();
  };

  return (
    <header>
      <div className="grid grid-cols-5 gap-4 px-4">
        <a href="/" className="">
          <div className="flex flex-row items-center">
            <img className="nav-logo" alt="logo" src={logo}></img>
          </div>
        </a>
        <div className="col-start-2 col-end-5">
          <form onSubmit={props.searchMovies}>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                ref={queryRef}
                value={props.searchKey}
                onChange={handleInputChange}
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              {/* <button onClick={clearSearch}>X</button> */}

              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          {queryRef.current.length > 0 && (
            <ul className="h-full">
              {props.moviesNav.map((result) => (
                <li
                  key={result.id}
                  className="bg-zinc-400 text-black h-10 hover:text-white cursor-pointer border"
                  onClick={() => navListClick(result)}
                >
                  {result.original_title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-row items-center gap-3 justify-end">
          <p>API from </p>
          <a href="https://www.themoviedb.org/">
            <img
              alt="logo"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              height={"150px"}
              width={"150px"}
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
