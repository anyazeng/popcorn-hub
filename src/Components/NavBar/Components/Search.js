import { useState, React, useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  //Create the ref
  const inputEl = useRef(null);
  //Use the ref
  //effect runs after the DOM has been loaded
  useEffect(
    function () {
      function inputFocus(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", inputFocus);
      return () => document.removeEventListener("keydown", inputFocus);
    },
    [setQuery]
  );

  // //focus on the input field when mounting
  // //not declarative
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Search;
