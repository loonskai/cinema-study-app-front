import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import actions from './../redux/actions/index';
import MovieItem from './../components/MovieItem';

interface Props {
  loadMoviesList: any;
  movies: Array<any>;
}

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
          <div>...Loading</div>
        ) : (
          this.props.movies.map(movie => (
            <MovieItem key={movie.id} data={movie} />
          ))
        )}
      </div>
    );
  }
}

export default connect(
  ({ movies }: { movies: any }) => ({ movies }),
  actions
)(Movies);
