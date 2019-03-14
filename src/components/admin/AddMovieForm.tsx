import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import api from '../../ApiService';
import AdminFormContainer from './AdminFormContainer';
import AddButton from '../buttons/AddButton';
import SubmitButton from '../buttons/SubmitButton';
import HeaderButton from '../buttons/HeaderButton';
import {
  containerGreyColor,
  whiteColor,
  mainDarkColor,
  greyColor
} from '../../constants';

const LoadedMoviesList = styled.div`
  width: 100%;
  max-height: 400px;
  margin-bottom: 2rem;
  padding: 2rem;
  overflow: scroll;
  background: ${containerGreyColor};
  border: 1px solid ${greyColor};
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
  transition: all 600ms cubic-bezier(0.165, 0.84, 0.44, 1);

  &&.movie-selected {
    background: ${mainDarkColor};
    color: ${whiteColor};
    box-shadow: none;
  }

  @media screen and (max-width: 556px) {
    flex-wrap: wrap;
  }
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

const SelectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem;
`;

const SelectedDataController = styled.form`
  max-width: 200px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const AddMovieForm = ({ handleSnackbar }: any) => {
  const [loadedMovies, setLoadedMovies] = useState([]);
  const [selectedMovies, setSelectedMovies]: [any, any] = useState({});

  const handleSelectItem = (id: string) => {
    const movieSelected = loadedMovies.find((movie: any) => movie.id === +id);
    if (selectedMovies[id]) {
      const updatedMoviesSelected: any = Object.assign({}, selectedMovies);
      delete updatedMoviesSelected[id];
      setSelectedMovies(updatedMoviesSelected);
    } else {
      const updatedMoviesSelected: any = Object.assign({}, selectedMovies, {
        [id]: movieSelected
      });
      setSelectedMovies(updatedMoviesSelected);
    }
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = api.addMovies(selectedMovies);
    if (result) {
      setSelectedMovies({});
      handleSnackbar('New movies added', 'success');
    }
  };

  useEffect(() => {
    if (!loadedMovies.length) {
      loadExternalAPIMovies();
    }
  }, [selectedMovies]);

  return (
    <AdminFormContainer title="Add Movie">
      {!!loadedMovies.length && (
        <LoadedMoviesList>
          {loadedMovies.map((movie: any) => {
            const isSelected = !!selectedMovies[movie.id];
            const movieClass = classnames({
              'movie-selected': isSelected
            });
            return (
              <LoadedMovie key={movie.id.toString()} className={movieClass}>
                <div>
                  <LoadedMovieTitle>{movie.title}</LoadedMovieTitle>
                  <LoadedMovieDescription>
                    {movie.overview}
                  </LoadedMovieDescription>
                </div>
                <SelectButtonContainer>
                  <AddButton
                    icon={isSelected ? <DeleteIcon /> : <AddIcon />}
                    handleClick={handleSelectItem}
                    id={movie.id}
                    isSelected={isSelected}
                  />
                </SelectButtonContainer>
              </LoadedMovie>
            );
          })}
        </LoadedMoviesList>
      )}
      <SelectedDataController onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          Movies selected: {Object.keys(selectedMovies).length}
        </div>
        <HeaderButton
          text="Clear"
          icon={<DeleteIcon />}
          disabled={!Object.keys(selectedMovies).length}
          handleClick={() => {
            setSelectedMovies({});
          }}
        />
        <SubmitButton
          text="Add Movies"
          icon={<AddIcon />}
          disabled={!Object.keys(selectedMovies).length}
          withoutContainer={true}
        />
      </SelectedDataController>
    </AdminFormContainer>
  );
};

export default AddMovieForm;
