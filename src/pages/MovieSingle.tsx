import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import SearchSessionForm from '../components/forms/SearchSessionForm';
import StyledPoster from '../components/pictures/StyledPoster';

interface MatchExended {
  params: {
    id: string;
  };
}

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

const MovieSingle: React.FC<RouteComponentProps> = ({ match, location }) => {
  const matchExtended: MatchExended = match as any;
  const [movie, setMovie]: [any, any] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [searchValues, setSearchValues] = useState({
    city: '',
    cinema: '',
    date: new Date(),
    time: ''
  });

  const loadData = async (id: string) => {
    const movieLoaded = await api.loadMovieById(id);
    setMovie(movieLoaded);
    setLoading(false);
  };

  useEffect(() => {
    loadData(matchExtended.params.id);
    const { state: locationState } = location;
    if (locationState) {
      setSearchValues({
        city: locationState.city || searchValues.city,
        cinema: locationState.cinema || searchValues.cinema,
        date: locationState.date || searchValues.date,
        time: locationState.time || searchValues.time
      });
    }
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
          <SearchSessionForm
            movieId={+matchExtended.params.id}
            initialValues={searchValues}
          />
        </StyledDescription>
      </MovieInfoContainer>
    </Fragment>
  );
};

export default withRouter(MovieSingle);
