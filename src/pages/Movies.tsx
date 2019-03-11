import React from 'react';
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
    if (filteredMovies.length === 0) {
      return 'Nothing found';
    }
    return filteredMovies.map((movie: any) => (
      <MovieItem key={movie.id} data={movie} />
    ));
  };

  render() {
    const { isLoading } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <Container>
        <FieldContainer
          id="movie"
          type="text"
          icon="search"
          entity="movie"
          label="Movie Title"
          handleChange={this.handleSearchBar}
          withoutSuggestions={true}
        />
        <PageTitle text="Movies" />
        <MoviesContainer>{this.getMoviesList()}</MoviesContainer>
      </Container>
    );
  }
}

export default connect(
  ({ movies }: { movies: any }) => ({ movies }),
  actions
)(Movies as any);
