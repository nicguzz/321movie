import { IMAGE_PATH, URL_IMAGE } from "../api/Api";
import YouTube from "react-youtube";

function Hero(props) {
  // const to change decrease float for dates and vote
  const releaseDate = () => {
    return parseFloat(props.movie.release_date).toFixed();
  };

  const averageVote = () => {
    return parseFloat(props.movie.vote_average).toFixed(1);
  };

  return (
    <div>
      {props.movie ? (
        <div
          className="viewtrailer"
          style={{
            backgroundImage: `url("${IMAGE_PATH}${props.movie.backdrop_path}")`,
          }}
        >
          {props.playing ? (
            <>
              <YouTube
                videoId={props.trailer.key}
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
              <button onClick={() => props.setPlaying(false)} className="boton">
                Close
              </button>
            </>
          ) : (
            <div className="container">
              <div className="">
                {props.trailer ? (
                  <button
                    className="boton"
                    onClick={() => props.setPlaying(true)}
                    type="button"
                  >
                    Play Trailer
                  </button>
                ) : (
                  "Sorry, no trailer available"
                )}
              </div>
              <p className="text-white">{props.movie.overview}</p>
              <div className="d-flex flex-row">
                <img
                  className="rounded-2"
                  src={`${URL_IMAGE + props.movie.poster_path}`}
                  alt=""
                  height={300}
                  width="20%"
                />
                <div className="d-flex flex-column">
                  <h1 className="text-white">{props.movie.title}</h1>
                  <h2 className="text-white">{releaseDate()}</h2>
                  <h2 className="text-white">Score: {averageVote()}</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Hero;
