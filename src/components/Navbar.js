import React from "react";
import { useEffect, useRef } from "react";
import logo from "../logos/logo-rec.png";
const Navbar = (props) => {
  // const [results, setResults] = useState([]);

  const queryRef = useRef("");

  const handleInputChange = (e) => {
    props.setSearchKey(e.target.value);
    e.preventDefault();
  };

  // usar useffect ahora
  useEffect(() => {
    queryRef.current = props.searchKey;
    // Perform the search whenever the query changes
    props.onTypingResults(props.searchKey);
  }, [props.searchKey]);

  const clearSearch = (e) => {
    console.log(`qref on clearsearch is: ${queryRef.current}`);
    queryRef.current = "";
    e.preventDefault();
    props.setSearchKey("");
    console.log("clear search is applied");
    console.log(`qref on clearsearch is: ${queryRef.current}`);
    console.log(`search key is ${props.searchKey}`);
  };

  const navListClick = (something) => {
    props.selectMovie(something);
    props.searchMovies();
  };

  return (
    <header>
      <div className="grid grid-cols-5 gap-4">
        <a href="/" className="">
          <div className="flex flex-row items-center">
            <img className="nav-logo" alt="logo" src={logo}></img>
          </div>
        </a>
        <div className="col-start-2 col-end-5">
          <form className="flex h-10 gap-8" onSubmit={props.searchMovies}>
            <input
              ref={queryRef}
              value={queryRef.current}
              type="text"
              placeholder="search"
              className="w-full h-full text-black"
              onChange={handleInputChange}
            />
            <button onClick={clearSearch}>X</button>
            <button className="">Go</button>
          </form>
          {queryRef.current.length > 0 && (
            <ul className="h-full">
              {props.moviesNav.map((result) => (
                <li
                  key={result.id}
                  className="bg-zinc-400 text-black h-10 hover:text-white cursor-pointer border"
                  onClick={navListClick}
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
