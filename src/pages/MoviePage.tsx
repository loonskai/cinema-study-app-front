import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from './../ApiService';
import Loader from './../components/Loader';
import PageTitle from './../components/PageTitle';
import SearchSessionForm from './../components/SearchSessionForm';

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
  align-self: flex-start;
`;

const StyledDescription = styled.div`
  @media screen and (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const MoviePage = ({ match }: any) => {
  const [loadedMovie, setMovie]: [any, any] = useState({});
  const [isLoading, setLoading] = useState(true);

  const loadData = async (id: string) => {
    const singleMovie = await api.loadMovieById(id);
    setMovie(singleMovie);
    setLoading(false);
  };

  useEffect(() => {
    loadData(match.params.id);
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
        <StyledDescription>
          <div>{loadedMovie.overview}</div>
          <SearchSessionForm />
        </StyledDescription>
      </MovieInfoContainer>
    </div>
  );
};

export default MoviePage;
