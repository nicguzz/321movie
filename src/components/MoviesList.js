import { URL_IMAGE } from "../api/Api";

function moviesList(props) {
  /* contenedor para mostrar los posters y las peliculas en la peticion a la api */
  return (
    <div className=" mt-3">
      <div className="grid grid-cols-4 gap-6 px-4">
        {props.movies.map((movie) => (
          <div
            key={movie.id}
            className="mb-3 cursor-pointer"
            onClick={() => props.selectMovie(movie)}
          >
            <img
              className="rounded-lg"
              src={`${URL_IMAGE + movie.poster_path}`}
              alt=""
              height={600}
              width="100%"
            />
            <h4 className="text-center mt-2">{`${movie.title} (${parseFloat(
              movie.release_date
            ).toFixed()})`}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default moviesList;
