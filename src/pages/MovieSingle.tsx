import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import Movie from '../classes/Movie';
import movieService from '../services/Movie';
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
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [searchValues, setSearchValues] = useState({
    city: '',
    cinema: '',
    hall: '',
    date: new Date()
  });

  useEffect(() => {
    if (!movie) {
      movieService.getById(matchExtended.params.id, setMovie);
      setLoading(false);
    }
    const { state: locationState } = location;
    if (locationState) {
      setSearchValues({
        city: locationState.city || searchValues.city,
        cinema: locationState.cinema || searchValues.cinema,
        hall: locationState.hall || searchValues.hall,
        date: locationState.date || searchValues.date
      });
    }
  }, []);

  const { title = '', poster = '', overview = '' } = movie || {};
  return isLoading ? (
    <Loader />
  ) : (
    <Fragment>
      <PageTitle text={title} />
      <MovieInfoContainer>
        <StyledPoster src={poster} alt={title} />
        <StyledDescription>
          <div>{overview}</div>
          <SearchSessionForm
            movieID={+matchExtended.params.id}
            initialValues={searchValues}
          />
        </StyledDescription>
      </MovieInfoContainer>
    </Fragment>
  );
};

export default withRouter(MovieSingle);
