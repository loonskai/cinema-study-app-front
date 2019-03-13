import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from './../redux/actions/index';
import PageTitle from './../components/PageTitle';
import MovieItem from './../components/MovieItem';
import Loader from './../components/Loader';
import FieldContainer from '../components/fields/FieldContainer';

interface Props {
  loadMoviesList: any;
  movies: Array<any>;
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

const Movies = ({ movies, loadMoviesList }: any) => {
  const [isLoading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    if (!movies) {
      loadMoviesList();
    } else {
      setLoading(false);
    }
  }, [movies]);

  const handleSearchBar = (e: any) => {
    setFilterText(e.target.value.toLowerCase().trim());
  };

  const getFilteredMovies = () => {
    if (!movies) return null;
    const filteredMovies = !filterText
      ? movies
      : movies.filter((movie: any) =>
          movie.original_title.toLowerCase().includes(filterText)
        );
    if (!filteredMovies.length) {
      return 'Nothing found';
    }
    return filteredMovies.map((movie: any) => (
      <MovieItem key={movie.id} data={movie} />
    ));
  };

  return (
    <Container>
      <FieldContainer
        id="movie"
        type="text"
        icon="search"
        entity="movie"
        label="Movie Title"
        handleChange={handleSearchBar}
        withoutSuggestions={true}
      />
      <PageTitle text="Movies" />
      <MoviesContainer>
        {isLoading ? <Loader /> : getFilteredMovies()}
      </MoviesContainer>
    </Container>
  );
};

export default connect(
  ({ movies }: { movies: any }) => ({ movies }),
  actions
)(Movies as any);
