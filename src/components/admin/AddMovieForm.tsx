import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

import api from '../../ApiService';
import AdminFormContainer from './AdminFormContainer';
import AddButton from '../buttons/AddButton';
import { containerGreyColor, whiteColor } from '../../constants';

const LoadedMoviesList = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: scroll;
  background: ${containerGreyColor};
  padding: 2rem;
  border-radius: 5px;
  box-shadow: inset 0px 0px 30px -10px rgba(0, 0, 0, 0.2);
`;

const LoadedMovie = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: ${whiteColor};
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
`;

const LoadedMovieTitle = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
`;

const LoadedMovieDescription = styled.div`
  font-size: 0.8rem;
  line-height: 1.2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
`;

const AddMovieForm = ({ handleSnackbar }: any) => {
  const [loadedMovies, setLoadedMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  const handleSelectItem = id => {
    console.dir(id);
  };

  const loadExternalAPIMovies = async () => {
    try {
      const data: any = await api.loadExternalAPIMovies();
      const filteredData = data.map((movie: any) => ({
        id: movie.id,
        title: movie.original_title,
        overview: movie.overview,
        picture: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      }));
      setLoadedMovies(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!loadedMovies.length) {
      loadExternalAPIMovies();
    }
  }, []);

  return (
    <AdminFormContainer title="Add Movie">
      {!!loadedMovies.length && (
        <LoadedMoviesList>
          {loadedMovies.map((movie: any) => (
            <LoadedMovie>
              <div>
                <LoadedMovieTitle>{movie.title}</LoadedMovieTitle>
                <LoadedMovieDescription>
                  {movie.overview}
                </LoadedMovieDescription>
              </div>
              <ButtonsContainer>
                <AddButton
                  icon={<AddIcon />}
                  handleClick={handleSelectItem}
                  id={movie.id}
                />
              </ButtonsContainer>
            </LoadedMovie>
          ))}
        </LoadedMoviesList>
      )}
    </AdminFormContainer>
  );
};

export default AddMovieForm;
