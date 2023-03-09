import React from "react";
import { useState, useEffect } from "react";
// import searchMovies from "../App";

const Navbar = (props) => {
  // const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    props.setSearchKey(e.target.value);
  };

  // usar useffect ahora
  useEffect(() => {
    // Perform the search whenever the query changes
    props.searchMoviesNav();
  }, [props.searchKey]);
  return (
    <header>
      <div className="grid grid-cols-5 gap-4">
        <a href="/" className="">
          <div className="flex flex-row items-center">
            <img
              className="nav-logo"
              alt="logo"
              src="https://cdn-icons-png.flaticon.com/512/168/168818.png"
            ></img>
            <h2 className="">321 Movies</h2>
          </div>
        </a>
        <div className="col-start-2 col-end-5">
          <form className="flex h-10 gap-8" onSubmit={props.searchMoviesNav}>
            <input
              type="text"
              value={props.searchKey}
              placeholder="search"
              onChange={handleInputChange}
              className="w-full h-full text-black"
            />
            <button className="">Go</button>
          </form>
          <ul className="h-full">
            {props.itemFound ? (
              props.movies.map((result) => (
                <li
                  key={result}
                  className="bg-zinc-400 text-black h-10 hover:text-white cursor-pointer border"
                  onClick={() => props.selectMovie(result)}
                >
                  {result.original_title}
                </li>
              ))
            ) : (
              <li>Nothing to display</li>
            )}
          </ul>
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
