import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Search from "./Components/NavBar/Components/Search";
import NumResults from "./Components/NavBar/Components/NumResults";
import MovieList from "./Components/SearchResultsList/Components/MovieList";
import ListBox from "./Components/ListBox/ListBox";
import WatchedSummary from "./Components/WatchedList/Components/WatchedSummary";
import WatchedMoviesList from "./Components/WatchedList/Components/WatchedMoviesList";
import MovieDetails from "./Components/WatchedList/Components/MovieDetails";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("tt1375666");

  const KEY = "6a15263b";

  //We need to place the async function in a new function. Because Effect callbacks are sychronous to prevent race conditions, the function can not return a promise.

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        //CHECK if fetching is successful
        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        //WHEN DATA NOT FOUND -> data undefined
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        console.log(data);
      } catch (err) {
        // console.log(err.message);
        setError(err.message);
      } finally {
        //When there is a new Error -> return, so the logic below is to make sure loading is set to false at the end
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query]);

  function Loader() {
    return <p className="loader">LOADING...</p>;
  }

  function ErrorMessage({ message }) {
    return (
      <p className="error">
        <span>🌚</span>
        {message}
      </p>
    );
  }

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = (id) => {
    setSelectedId(null);
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <main className="main">
        <ListBox>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </ListBox>
      </main>
    </>
  );
}

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
