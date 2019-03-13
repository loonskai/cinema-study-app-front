import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';

import actions from '../redux/actions';
import PageTitle from '../components/PageTitle';
import FieldContainer from '../components/fields/FieldContainer';
import SubmitButton from '../components/buttons/SubmitButton';

const Home = ({ loadCinemasByCity }: any) => {
  const [movie, setMovie] = useState('');
  const [citySelected, setCitySelected] = useState('');
  const [cityTyped, setCityTyped] = useState('');
  const [cinema, setCinema] = useState('');
  const [date, setDate] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(movie);
    console.log(citySelected);
    console.log(cinema);
    console.log(date);
  };

  useEffect(() => {
    if (movie || citySelected || cinema) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    if (citySelected) {
      loadCinemasByCity(citySelected);
    } else {
      setCinema('');
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
        value={movie}
        handleChange={setMovie}
      />
      <FieldContainer
        id="city"
        type="text"
        entity="city"
        label="Where do you live?"
        value={citySelected === cityTyped ? citySelected : cityTyped}
        handleChange={setCityTyped}
        handleSelect={setCitySelected}
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

export default connect(
  null,
  actions
)(Home);
