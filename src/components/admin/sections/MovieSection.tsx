import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Movie from '../../../classes/Movie';
import movieService from '../../../services/Movie';

import AdminFormContainer from '../AdminFormContainer';
import AddButton from '../../buttons/AddButton';
import SubmitButton from '../../buttons/SubmitButton';
import HeaderButton from '../../buttons/HeaderButton';
import Loader from '../../Loader';
import {
  containerGreyColor,
  whiteColor,
  mainDarkColor,
  greyColor
} from '../../../constants';

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

  && div {
    text-align: center;
  }

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

const LoadedMoviePoster = styled.img`
  width: 100px;
  margin-right: 1rem;
`;

const LoadedMovieOverview = styled.div`
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
  const [loadedMovies, setLoadedMovies] = useState<Movie[]>([]);
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
      const externalAPIMovies = await movieService.getExternalAPIMovieAll();
      if (!externalAPIMovies) {
        throw Error('Unable to load movies from external API');
      }
      const apiMovies = await movieService.getAll();
      let filteredExternalAPIMovies;
      if (apiMovies) {
        const usedIDs = apiMovies.map(movie => movie.id);
        filteredExternalAPIMovies = externalAPIMovies
          .map(movie => new Movie(movie))
          .filter(movie => !usedIDs.includes(movie.id));
      } else {
        filteredExternalAPIMovies = externalAPIMovies.map(
          movie => new Movie(movie)
        );
      }
      setLoadedMovies(filteredExternalAPIMovies);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    /*     const result = api.addMovies(selectedMovies);
    if (result) {
      setSelectedMovies({});
      handleSnackbar('New movies added', 'success');
    } */
  };

  useEffect(() => {
    if (!loadedMovies.length) {
      setLoading(true);
      loadExternalAPIMovies();
    } else {
      setLoading(false);
    }
  }, [loadedMovies, selectedMovies]);

  return (
    <AdminFormContainer title="Add Movies">
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <SelectedDataController onSubmit={handleSubmit}>
            <div className="summary-line">
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
          <LoadedMoviesList>
            {loadedMovies.map(movie => {
              const isSelected = !!selectedMovies[movie.id];
              const movieClass = classnames({
                'movie-selected': isSelected
              });
              return (
                <LoadedMovie key={movie.id.toString()} className={movieClass}>
                  <div>
                    <LoadedMoviePoster src={movie.poster} />
                  </div>
                  <div>
                    <LoadedMovieTitle>{movie.title}</LoadedMovieTitle>
                    <LoadedMovieOverview>{movie.overview}</LoadedMovieOverview>
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
        </Fragment>
      )}
    </AdminFormContainer>
  );
};

export default MovieSection;
