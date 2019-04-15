import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Movie from '../classes/Movie';
import actions from './../redux/actions/index';

import PageTitle from './../components/PageTitle';
import MovieItem from './../components/MovieItem';
import Loader from './../components/Loader';
import FieldContainer from '../components/fields/FieldContainer';

interface Props {
  loadMoviesList: (dispatch?: any) => Promise<void>;
  movies: Movie[];
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const MoviesContainer = styled.div`
  margin: 0 auto;
  max-width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Movies: React.FC<Props> = ({ movies, loadMoviesList }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    if (!movies) {
      loadMoviesList();
    } else {
      setLoading(false);
    }
  }, [movies]);

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterText(e.target.value.toLowerCase().trim());
  };

  const getFilteredMovies = () => {
    if (!movies) return null;
    const filteredMovies = !filterText
      ? movies
      : movies.filter((movie: any) =>
          movie.title.toLowerCase().includes(filterText)
        );
    if (!filteredMovies.length) {
      return 'Nothing found';
    }
    return filteredMovies.map(movie => (
      <MovieItem key={movie.id} data={movie} />
    ));
  };

  return (
    <Container>
      <FieldContainer
        id="movie"
        type="text"
        icon="search"
        label="Movie Title"
        handleChange={handleSearchBar}
      />
      <PageTitle text="Movies" />
      <MoviesContainer>
        {isLoading ? <Loader /> : getFilteredMovies()}
      </MoviesContainer>
    </Container>
  );
};

export default connect(
  ({ movies }: { movies: Movie[] }) => ({ movies }),
  actions
)(Movies as any);
