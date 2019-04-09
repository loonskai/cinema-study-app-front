import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Movie from '../../../classes/Movie';
import movieService from '../../../services/Movie';

import parseFieldsFromEntity from '../../../helpers/parseFieldsFromEntity';
import AdminFormContainer from '../AdminFormContainer';
import ExternalAPIMoviesList from '../elements/ExternalAPIMoviesList';
import SubmitButton from '../../buttons/SubmitButton';
import HeaderButton from '../../buttons/HeaderButton';
import AdminListItem from '../elements/AdminListItem';
import Loader from '../../Loader';

const SelectedDataController = styled.form`
  max-width: 220px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  & .summary-line {
    margin-bottom: 1rem;
  }

  & button,
  & div {
    width: 100%;
  }
`;

const MovieSection = ({ handleSnackbar }: any) => {
  const [isLoadingExternalMovies, setLoadingExternalMovies] = useState<boolean>(
    true
  );
  const [moviesList, setMoviesList] = useState<Movie[] | null>(null);
  const [externalAPIMovies, setExternalAPIMovies] = useState<Movie[] | null>(
    null
  );
  const [selectedExternalAPIMovies, setSelectedMovies] = useState<{
    [key: number]: Movie;
  }>({});

  useEffect(() => {
    if (!externalAPIMovies) {
      loadExternalAPIMovies();
    }
    if (!moviesList) {
      movieService.getAll(setMoviesList);
    }
  }, [moviesList, externalAPIMovies]);

  const handleSelectItem = (id: string) => {
    if (!externalAPIMovies) return;
    const movieSelected = externalAPIMovies.find(movie => movie.id === +id);
    if (selectedExternalAPIMovies[+id]) {
      const updatedMoviesSelected = Object.assign(
        {},
        selectedExternalAPIMovies
      );
      delete updatedMoviesSelected[+id];
      setSelectedMovies(updatedMoviesSelected);
    } else {
      const updatedMoviesSelected = Object.assign(
        {},
        selectedExternalAPIMovies,
        {
          [id]: movieSelected
        }
      );
      setSelectedMovies(updatedMoviesSelected);
    }
  };

  const loadExternalAPIMovies = async () => {
    try {
      const externalAPIMoviesLoaded = await movieService.getExternalAPIMovieAll();
      if (!externalAPIMoviesLoaded) {
        throw Error('Unable to load movies from external API');
      }
      const apiMovies = await movieService.getAll();
      let filteredExternalAPIMovies;
      if (apiMovies) {
        const usedIDs = apiMovies.map(movie => movie.id);
        filteredExternalAPIMovies = externalAPIMoviesLoaded
          .map(movie => new Movie(movie))
          .filter(movie => !usedIDs.includes(movie.id));
      } else {
        filteredExternalAPIMovies = externalAPIMoviesLoaded.map(
          movie => new Movie(movie)
        );
      }
      setExternalAPIMovies(filteredExternalAPIMovies);
      setLoadingExternalMovies(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMovies = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await movieService.createMany(selectedExternalAPIMovies);
    if (result) {
      setSelectedMovies({});
      handleSnackbar('New movies added', 'success');
      await movieService.getAll(setMoviesList);
      await loadExternalAPIMovies();
    }
  };

  const handleUpdate = async (id: number, inputValues: any): Promise<any> => {
    const result = await movieService.update(id, inputValues);
    if (result.error) {
      handleSnackbar('Unable to update movie', 'error');
    } else {
      handleSnackbar('Succesfully updated', 'success');
      await movieService.getAll(setMoviesList);
      await loadExternalAPIMovies();
      return result.data;
    }
  };

  const handleRemove = async (id: number) => {
    const result = await movieService.delete(id);
    if (!result) {
      handleSnackbar('Unable to delete movie', 'error');
    } else {
      handleSnackbar('Movie deleted', 'warning');
      await movieService.getAll(setMoviesList);
      await loadExternalAPIMovies();
    }
  };

  return (
    <AdminFormContainer title="Add Movies">
      <SelectedDataController onSubmit={handleAddMovies}>
        <div className="summary-line">
          Movies selected: {Object.keys(selectedExternalAPIMovies).length}
        </div>
        <HeaderButton
          text="Clear"
          icon={<DeleteIcon />}
          disabled={!Object.keys(selectedExternalAPIMovies).length}
          handleClick={() => {
            setSelectedMovies({});
          }}
        />
        <SubmitButton
          text="Add Movies"
          icon={<AddIcon />}
          disabled={!Object.keys(selectedExternalAPIMovies).length}
          withoutContainer={true}
        />
      </SelectedDataController>
      {isLoadingExternalMovies ? (
        <Loader />
      ) : (
        <ExternalAPIMoviesList
          handleSelectItem={handleSelectItem}
          movies={externalAPIMovies || []}
          moviesSelected={selectedExternalAPIMovies}
        />
      )}
      {moviesList && !!moviesList.length && (
        <Fragment>
          <h3>Movies List</h3>
          {moviesList.map(item => (
            <AdminListItem
              properties={parseFieldsFromEntity(item as any)}
              key={item.id.toString()}
              id={item.id}
              handleUpdate={handleUpdate}
              handleRemove={handleRemove}
              handleSnackbar={handleSnackbar}
            />
          ))}
        </Fragment>
      )}
    </AdminFormContainer>
  );
};

export default MovieSection;
