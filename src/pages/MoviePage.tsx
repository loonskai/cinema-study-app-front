import React from 'react';
import { connect } from 'react-redux';

const MoviePage = ({ movie }: { movie: any }) => {
  if (!movie) return <div>Data not loaded</div>;
  return (
    <div>
      <h1>{movie.original_title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.original_title}
      />
      <p>{movie.overview}</p>
    </div>
  );
};

export default connect(({ movies }: { movies: any }, initialProps: any) => {
  const { match } = initialProps;
  return {
    movie: movies.data.find(
      (movie: any) => movie.id.toString() === match.params.id
    )
  };
})(MoviePage);
