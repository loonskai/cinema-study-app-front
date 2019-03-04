import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import api from './../ApiService';
import Loader from './../components/Loader';
import PageTitle from './../components/PageTitle';

const MovieInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
`;

const StyledPoster = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  margin: 1rem 0;
  align-self: center;
`;

const StyledDescription = styled.div`
  @media screen and (min-width: 768px) {
    padding: 1.5rem;
  }
`;

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
      <PageTitle text={loadedMovie.original_title} />
      <MovieInfoContainer>
        <StyledPoster
          src={`https://image.tmdb.org/t/p/w500${loadedMovie.poster_path}`}
          alt={loadedMovie.original_title}
        />
        <StyledDescription>{loadedMovie.overview}</StyledDescription>
      </MovieInfoContainer>
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
