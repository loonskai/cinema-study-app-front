import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from './../redux/actions/index';
import MovieItem from './../components/MovieItem';
import Loader from './../components/Loader';

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
      isLoading: true
    };
  }

  async componentDidMount() {
    await this.props.loadMoviesList();
    this.setState({ isLoading: false });
  }

  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <MoviesContainer>
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
