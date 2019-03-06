import React, { useState, useEffect } from 'react';

import api from './../ApiService';
import Loader from './../components/Loader';
import PageTitle from './../components/PageTitle';

const SessionPage = ({ match }: any) => {
  const [session, setSession]: [any, any] = useState({});
  const [movie, setMovie]: [any, any] = useState({});
  const [isLoading, setLoading] = useState(true);

  const loadData = async (id: string) => {
    const singleSession: any = await api.loadSessionById(+id);
    const singleMovie = await api.loadMovieById(singleSession.movieId);
    setSession(singleSession);
    setMovie(singleMovie);
    setLoading(false);
  };

  useEffect(() => {
    loadData(match.params.id);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>{movie.original_title}</h1>
      <div>{session.cinema}</div>;
    </div>
  );
};

export default SessionPage;
