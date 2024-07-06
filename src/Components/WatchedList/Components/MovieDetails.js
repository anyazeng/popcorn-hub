import React, { useDeferredValue, useEffect, useState } from "react";
import StarRating from "../../StarRating";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const KEY = "6a15263b";

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovie(data);
    }
    getMovieDetails();
  }, [selectedId]);

  function Loader() {
    return <p className="loader">LOADING...</p>;
  }

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at[0]),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>

            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                <span>{`${imdbRating} IMDb rating`}</span>
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetMovieRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      +Add Watched
                    </button>
                  )}
                </>
              ) : (
                <div>
                  <p>
                    You have rated this moive with{" "}
                    <span>{watchedUserRating}</span>
                    <span> 🌟</span>. 🎬
                  </p>
                </div>
              )}
            </div>
            <p>
              <i>{plot}</i>
            </p>
            <p>{actors}</p>
            <p>{director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
