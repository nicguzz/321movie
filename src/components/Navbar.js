import React from "react";
// import searchMovies from "../App";

const Navbar = (props) => {
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
          <form className="flex h-full gap-8" onSubmit={props.searchMovies}>
            <input
              type="text"
              placeholder="search"
              onChange={(e) => props.setSearchKey(e.target.value)}
              className="w-full h-full text-black"
            />
            <button className="">Go</button>
          </form>
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
