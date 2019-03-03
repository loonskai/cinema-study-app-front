import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from './../redux/actions/index';
import MovieItem from './../components/MovieItem';
import Loader from './../components/Loader';
import TextField from './../components/TextField/TextField';

interface Props {
  loadMoviesList: any;
  movies: Array<any>;
}

const MoviesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

class Movies extends React.Component<any, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      filterText: ''
    };
  }

  async componentDidMount() {
    await this.props.loadMoviesList();
    this.setState({ isLoading: false });
  }

  filterMovies = (filterText: string) => {
    this.setState({
      filterText
    });
  };

  render() {
    const { isLoading, filterText } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <MoviesContainer>
        <TextField
          withoutSuggestions={true}
          label="Find a movie"
          handleChange={this.filterMovies}
        />
        {this.props.movies.map((movie: any) => (
          <MovieItem key={movie.id} data={movie} />
        ))}
      </MoviesContainer>
    );
  }
}

export default connect(
  ({ movies }: { movies: any }) => ({ movies }),
  actions
)(Movies as any);
