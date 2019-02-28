import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import actions from './../redux/actions/index';

interface Props {
  loadMoviesList: any;
  movies: Array<any>;
}

/* const Movies = ({ loadMoviesList, movies }: Props) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    await loadMoviesList();
    console.log(movies);
    setLoading(false);
  });

  return (
    <div>
      {isLoading ? (
        <div>...Loading</div>
      ) : (
        movies.map(movie => <div key={movie.id}>{movie.original_title}</div>)
      )}
    </div>
  );
}; */
class Movies extends React.Component {
  constructor(props) {
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
            <div key={movie.id}>{movie.original_title}</div>
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
