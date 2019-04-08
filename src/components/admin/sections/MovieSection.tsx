import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Movie from '../../../classes/Movie';
import movieService from '../../../services/Movie';

import AdminFormContainer from '../AdminFormContainer';
import ExternalAPIMoviesList from '../elements/ExternalAPIMoviesList';
import SubmitButton from '../../buttons/SubmitButton';
import HeaderButton from '../../buttons/HeaderButton';
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
  const [isLoading, setLoading] = useState<boolean>(true);
  const [externalAPIMovies, setExternalAPIMovies] = useState<Movie[]>([]);
  const [selectedExternalAPIMovies, setSelectedMovies]: [any, any] = useState(
    {}
  );

  const handleSelectItem = (id: string) => {
    const movieSelected = externalAPIMovies.find(
      (movie: any) => movie.id === +id
    );
    if (selectedExternalAPIMovies[id]) {
      const updatedMoviesSelected: any = Object.assign(
        {},
        selectedExternalAPIMovies
      );
      delete updatedMoviesSelected[id];
      setSelectedMovies(updatedMoviesSelected);
    } else {
      const updatedMoviesSelected: any = Object.assign(
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await movieService.createMany(selectedExternalAPIMovies);
    if (result) {
      setSelectedMovies({});
      handleSnackbar('New movies added', 'success');
      await loadExternalAPIMovies();
    }
  };

  useEffect(() => {
    if (!externalAPIMovies.length) {
      setLoading(true);
      loadExternalAPIMovies();
    } else {
      setLoading(false);
    }
  }, [externalAPIMovies, selectedExternalAPIMovies]);

  return (
    <AdminFormContainer title="Add Movies">
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <SelectedDataController onSubmit={handleSubmit}>
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
          <ExternalAPIMoviesList
            handleSelectItem={handleSelectItem}
            movies={externalAPIMovies}
            moviesSelected={selectedExternalAPIMovies}
          />
        </Fragment>
      )}
    </AdminFormContainer>
  );
};

export default MovieSection;
