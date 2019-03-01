import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ data }) => {
  return (
    <div>
      <h3>{data.original_title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.original_title}
      />
      <Link to={`/movies/${data.id.toString()}`}>Details</Link>
    </div>
  );
};

export default MovieItem;
