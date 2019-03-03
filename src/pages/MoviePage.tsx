import React from 'react';
import { connect } from 'react-redux';

const MoviePage = ({ data }: { data: any }) => {
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

export default connect(({ movies }: { movies: any }, initialProps: any) => {
  const { match } = initialProps;
  return {
    data: movies.find((movie: any) => movie.id.toString() === match.params.id)
  };
})(MoviePage);
