import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import api from '../ApiService';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import SearchSessionForm from '../components/forms/SearchSessionForm';
import StyledPoster from '../components/pictures/StyledPoster';

const MovieInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
`;

const StyledDescription = styled.div`
  @media screen and (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const MovieSingle = ({ match }: any) => {
  const [movie, setMovie]: [any, any] = useState({});
  const [isLoading, setLoading] = useState(true);

  const loadData = async (id: string) => {
    const movieLoaded = await api.loadMovieById(id);
    setMovie(movieLoaded);
    setLoading(false);
  };

  useEffect(() => {
    loadData(match.params.id);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Fragment>
      <PageTitle text={movie.original_title} />
      <MovieInfoContainer>
        <StyledPoster
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
        <StyledDescription>
          <div>{movie.overview}</div>
          <SearchSessionForm />
        </StyledDescription>
      </MovieInfoContainer>
    </Fragment>
  );
};

export default MovieSingle;
