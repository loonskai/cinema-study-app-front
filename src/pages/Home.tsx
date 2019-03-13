import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import actions from '../redux/actions';
import PageTitle from '../components/PageTitle';
import FieldContainer from '../components/fields/FieldContainer';
import SubmitButton from '../components/buttons/SubmitButton';

const Home = ({ loadCinemasByCity, history, movies }: any) => {
  const [movieTyped, setMovieTyped] = useState('');
  const [movieSelected, setMovieSelected] = useState('');
  const [citySelected, setCitySelected] = useState('');
  const [cityTyped, setCityTyped] = useState('');
  const [cinema, setCinema] = useState('');
  const [date, setDate] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { id: movieId } = movies.find(
      (movie: any) => movie.original_title === movieSelected
    );
    history.push({
      pathname: `/movies/${movieId}`,
      state: {
        city: citySelected,
        cinema,
        date
      }
    });
  };

  useEffect(() => {
    setButtonDisabled(!movieSelected);
    if (citySelected) {
      loadCinemasByCity(citySelected);
    } else {
      setCinema('');
    }
    if (movieSelected !== movieTyped) {
      setMovieSelected('');
      setCityTyped('');
      setCitySelected('');
    }
    if (citySelected !== cityTyped) {
      setCitySelected('');
      setCinema('');
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <PageTitle text="Let's find something interesting" />
      <FieldContainer
        id="movie"
        type="text"
        entity="movie"
        label="Movie Title"
        value={movieSelected === movieTyped ? movieSelected : movieTyped}
        handleChange={setMovieTyped}
        handleSelect={setMovieSelected}
      />
      <FieldContainer
        id="city"
        type="text"
        entity="city"
        label="Where do you live?"
        value={citySelected === cityTyped ? citySelected : cityTyped}
        handleChange={setCityTyped}
        handleSelect={setCitySelected}
        disabled={!movieSelected}
      />
      <FieldContainer
        id="cinema"
        type="select"
        entity="cinema"
        label="Choose Cinema"
        value={cinema}
        handleChange={setCinema}
        disabled={!citySelected}
      />
      <FieldContainer
        id="date"
        type="date"
        entity="date"
        label="Choose Date"
        value={date}
        handleChange={setDate}
      />
      <SubmitButton
        text="Search"
        icon={<SearchIcon />}
        disabled={buttonDisabled}
      />
    </form>
  );
};

const connectedHome: any = connect(
  ({ movies }: any) => ({ movies }),
  actions
)(Home);

export default withRouter(connectedHome);
