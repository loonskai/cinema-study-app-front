import React, { Fragment, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import Session from '../classes/Session';
import Movie from '../classes/Movie';
import sessionService from '../services/Session';
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle';
import SeatsContainer from '../components/seats/SeatsContainer';
import StyledPoster from '../components/pictures/StyledPoster';
import { containerGreyColor, whiteColor, greyColor } from '../constants';

interface MatchExended {
  params: {
    id: string;
  };
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
  justify-content: center;
  padding: 1.25rem;
  background: ${containerGreyColor};
  border-radius: 0.3125rem;
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
  border-radius: 0.3125rem;
  box-shadow: 0px 0px 0px 1px ${greyColor};
`;

const SessionPage: React.FC<RouteComponentProps> = ({ match }) => {
  const matchExtended: MatchExended = match as any;
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    sessionService.getById(matchExtended.params.id, setSession);
    setLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Fragment>
      <Container>
        <PosterContainer>
          <StyledSessionPoster
            src={session && session.movie.poster}
            alt={session && session.movie.title}
          />
        </PosterContainer>
        <SessionOverview>
          <div>
            <PageTitle text={session ? session.movie.title : ''} />
            {session && session.movie.overview}
          </div>
          <SessionInfo>
            <div>
              City: <strong>{session && session.city}</strong>
            </div>
            <div>
              Cinema: <strong>{session && session.cinemaTitle}</strong>
            </div>
            <div>
              Date: <strong>{session && session.date}</strong>
            </div>
            <div>
              Time: <strong>{session && session.time}</strong>
            </div>
          </SessionInfo>
        </SessionOverview>
      </Container>
      {session && (
        <SeatsContainer
          sessionID={session.id}
          cinemaID={session.cinemaID}
          hallID={session.hallID}
        />
      )}
    </Fragment>
  );
};

export default SessionPage;
