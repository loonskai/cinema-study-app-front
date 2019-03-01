import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from './../redux/actions/index';
import MovieItem from './../components/MovieItem';
import loader from './../static/images/spinner.svg';

interface Props {
  loadMoviesList: any;
  movies: Array<any>;
}

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Movies extends React.Component {
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
    return (
      <div>
        {this.state.isLoading ? (
          <span dangerouslySetInnerHTML={{ __html: loader }} />
        ) : (
          <MoviesContainer>
            {this.props.movies.map(movie => (
              <MovieItem key={movie.id} data={movie} />
            ))}
          </MoviesContainer>
        )}
      </div>
    );
  }
}

export default connect(
  ({ movies }: { movies: any }) => ({ movies }),
  actions
)(Movies);
