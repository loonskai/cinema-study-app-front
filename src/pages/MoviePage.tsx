import React from 'react';
import { connect } from 'react-redux';

const MoviePage = ({ data }) => {
  return (
    <div>
      <h1>{data.original_title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.original_title}
      />
      <p>{data.overview}</p>
    </div>
  );
};

export default connect(({ movies }, initialProps) => {
  const { match } = initialProps;
  return {
    data: movies.find(movie => movie.id.toString() === match.params.id)
  };
})(MoviePage);
