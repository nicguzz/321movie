import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import YouTube from "react-youtube";
import {API_KEY, API_URL, IMAGE_PATH, URL_IMAGE} from "./api/Api.js"
import { type } from "@testing-library/user-event/dist/type";
function App() {

  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion get a la api

  
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

    if (results.length) {
      await fetchMovie(results[0].id);
    }
  }




  // funcion para la peticion de un solo objeto y mostrar en reproductor de videos

 

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

  // funcion para buscar peliculas
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);


// const to change decrease float for dates and vote
  const releaseDate = () => {
    return parseFloat(movie.release_date).toFixed()

  } 
  
  
const averageVote = () => {

  return parseFloat(movie.vote_average).toFixed(1)
}



// ------------------------------------ HTML --------------------------------


  return (
    <div>
     
      {/* el buscador */}
      <form className="container mx-2 mb-4 d-flex" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button className="btn btn-primary mx-2">Go</button>
      </form>

      <div>
        <main>
        
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
              
            >
<a href="/" className="text-decoration-none text-white">
              <div className="text-center d-flex flex-row justify-content-center align-items-center">
<img className="nav-logo" alt="logo" src="https://cdn-icons-png.flaticon.com/512/168/168818.png"></img>
      <h2 className="text-center ms-2">321 Movies</h2>

      </div>

</a>
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 1,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
                <div className="container">
                  <div className="">
                    {trailer ? (
                      <button
                        className="boton"
                        onClick={() => setPlaying(true)}
                        type="button"
                      >
                        Play Trailer
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-white">{movie.title}</h1>
                    <h2 className="text-white">{releaseDate()}</h2>
                    <h2 className="text-white">Score: {averageVote()}</h2>
                    <p className="text-white">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </main>
      </div>

      {/* contenedor para mostrar los posters y las peliculas en la peticion a la api */}
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="col-md-4 mb-3"
              onClick={() => selectMovie(movie)}
            >
              <img
              className="rounded-2"
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                height={600}
                width="100%"
              />
              <h4 className="text-center mt-2">{`${movie.title} (${parseFloat(movie.release_date).toFixed()})`}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
