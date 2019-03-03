import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from './../redux/actions/index';
import PageTitle from './../components/PageTitle';
import MovieItem from './../components/MovieItem';
import Loader from './../components/Loader';
import TextField from './../components/TextField/TextField';

interface Props {
  loadMoviesList: any;
  movies: Array<any>;
}

const MoviesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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

  handleSearchBar = (e: any) => {
    this.setState({
      filterText: e.target.value.toLowerCase().trim()
    });
  };

  getMoviesList = () => {
    const { movies } = this.props;
    const { filterText } = this.state;
    const filteredMovies =
      filterText === ''
        ? movies
        : movies.filter((movie: any) =>
            movie.original_title.toLowerCase().includes(filterText)
          );
    if (filteredMovies.length === 0) return 'Nothing found';
    return filteredMovies.map((movie: any) => (
      <MovieItem key={movie.id} data={movie} />
    ));
  };

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <MoviesContainer>
        <TextField
          withoutSuggestions={true}
          label="Find a movie"
          handleChange={this.handleSearchBar}
        />
        <PageTitle text="Movies" />
        {this.getMoviesList()}
      </MoviesContainer>
    );
  }
}

export default connect(
  ({ movies }: { movies: any }) => ({ movies }),
  actions
)(Movies as any);
