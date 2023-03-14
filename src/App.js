import { React, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { API_KEY, API_URL } from "./api/Api.js";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MoviesList from "./components/MoviesList";

function App() {
  // state variables
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [moviesNav, setMoviesNav] = useState([]);

  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);
  const [itemFound, setitemFound] = useState(false);

  // function to call the function get to the API

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);
  };

  const onTypingResults = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMoviesNav(results);
  };

  // function to call only 1 movie and to show it on Hero

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    //return data
    setMovie(data);
  };

  const selectMovie = async (movie) => {
    fetchMovie(movie.id);

    setMovie(movie);
    window.scrollTo(0, 0);
  };

  // function to search movies
  const searchMovies = (e) => {
    if (e) {
      e.preventDefault();
    }
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ------------------------------------ HTML --------------------------------

  return (
    <div>
      <div>
        <main>
          <Navbar
            setSearchKey={setSearchKey}
            searchKey={searchKey}
            setMovies={setMovies}
            movies={movies}
            itemFound={itemFound}
            selectMovie={selectMovie}
            searchMovies={searchMovies}
            onTypingResults={onTypingResults}
            moviesNav={moviesNav}
          />

          <Hero
            trailer={trailer}
            setPlaying={setPlaying}
            movie={movie}
            playing={playing}
          />
          <MoviesList
            selectMovie={selectMovie}
            movies={movies}
            itemFound={itemFound}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
