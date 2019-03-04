import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from './../ApiService';
import Loader from './../components/Loader';

const MoviePage = ({ movie, match }: any) => {
  const [loadedMovie, setMovie] = useState(movie);
  const [isLoading, setLoading] = useState(!movie);

  const loadMovieById = async (id: string) => {
    if (!movie) {
      const singleMovie = await api.loadMovieById(id);
      setMovie(singleMovie);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loadedMovie) {
      loadMovieById(match.params.id);
    }
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>{loadedMovie.original_title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${loadedMovie.poster_path}`}
        alt={loadedMovie.original_title}
      />
      <p>{loadedMovie.overview}</p>
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
