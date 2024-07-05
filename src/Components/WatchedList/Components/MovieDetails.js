import React from "react";

function MovieDetails({ selectedId, onCloseMovie }) {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <div>{selectedId}</div>
    </div>
  );
}

export default MovieDetails;
