import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import api from './../ApiService';
import Loader from './../components/Loader';
import PageTitle from './../components/PageTitle';
import SeatsContainer from './../components/SeatsContainer';
import { StyledPoster } from './../components/styled/images';
import { containerGreyColor, whiteColor, greyColor } from './../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
  justify-content: center;
  padding: 20px;
  background: ${containerGreyColor};
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px ${greyColor};
  overflow: hidden;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
`;

const PosterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  @media screen and (min-width: 768px) {
    width: auto;
  }
`;

const StyledSessionPoster = styled(StyledPoster)<any>`
  && {
    max-width: 200px;
  }
`;

const SessionOverview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 2rem;
  flex: 1;
`;

const SessionInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${whiteColor};
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px ${greyColor};
`;

const SessionPage = ({ match }: any) => {
  const [session, setSession]: [any, any] = useState({});
  const [movie, setMovie]: [any, any] = useState({});
  const [isLoading, setLoading] = useState(true);

  const loadData = async (id: string) => {
    const sessionLoaded: any = await api.loadSessionById(+id);
    const movieLoaded = await api.loadMovieById(sessionLoaded.movieId);
    setSession(sessionLoaded);
    setMovie(movieLoaded);
    setLoading(false);
  };

  useEffect(() => {
    loadData(match.params.id);
  }, []);

  const fontBold = {
    fontWeight: 700
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Fragment>
      <Container>
        <PosterContainer>
          <StyledSessionPoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
        </PosterContainer>
        <SessionOverview>
          <div>
            <PageTitle text={movie.original_title} />
            {movie.overview}
          </div>
          <SessionInfo>
            <div>
              City: <span style={fontBold}>{session.city}</span>
            </div>
            <div>
              Cinema: <span style={fontBold}>{session.cinema}</span>
            </div>
            <div>
              Date: <span style={fontBold}>{session.date}</span>
            </div>
            <div>
              Time: <span style={fontBold}>{session.time}</span>
            </div>
          </SessionInfo>
        </SessionOverview>
      </Container>
      <SeatsContainer />
    </Fragment>
  );
};

export default SessionPage;
