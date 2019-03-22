import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import {
  loadCinemaByCityOptions,
  loadCitySuggestions,
  loadMovieSuggestions
} from '../helpers/loadSelectOptions';
import PageTitle from '../components/PageTitle';
import FieldContainer from '../components/fields/FieldContainer';
import SubmitButton from '../components/buttons/SubmitButton';

const Home = ({ history, movies }: any) => {
  const [movieTyped, setMovieTyped] = useState('');
  const [movieSelected, setMovieSelected] = useState('');
  const [citySelected, setCitySelected] = useState('');
  const [cityTyped, setCityTyped] = useState('');
  const [cinema, setCinema] = useState('');
  const [date, setDate] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [movieSuggestions, setMovieSuggestions] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState(null);
  const [cinemaOptions, setCinemaOptions] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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

    if (!movieSuggestions) {
      loadMovieSuggestions(setMovieSuggestions);
    }

    if (!citySuggestions) {
      loadCitySuggestions(setCitySuggestions);
    }

    if (citySelected) {
      loadCinemaByCityOptions(citySelected, setCinemaOptions);
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
  }, [movieSelected, movieTyped, citySelected, cityTyped]);

  return (
    <form onSubmit={handleSubmit}>
      <PageTitle text="Let's find something interesting" />
      <FieldContainer
        id="movie"
        type="text"
        icon="movie"
        label="Movie Title"
        value={movieSelected === movieTyped ? movieSelected : movieTyped}
        handleChange={setMovieTyped}
        handleSelect={setMovieSelected}
        initialSuggestions={movieSuggestions}
      />
      <FieldContainer
        id="city"
        type="text"
        icon="city"
        label="Where do you live?"
        value={citySelected === cityTyped ? citySelected : cityTyped}
        handleChange={setCityTyped}
        handleSelect={setCitySelected}
        disabled={!movieSelected}
        initialSuggestions={citySuggestions}
      />
      <FieldContainer
        id="cinema"
        type="select"
        options={cinemaOptions}
        icon="cinema"
        label="Choose Cinema"
        value={cinema}
        handleChange={setCinema}
        disabled={!citySelected}
      />
      <FieldContainer
        id="date"
        type="date"
        icon="date"
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

const connectedHome: any = connect(({ movies }: any) => ({ movies }))(Home);

export default withRouter(connectedHome);
