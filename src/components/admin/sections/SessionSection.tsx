import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import sessionService from '../../../services/Session';
import AdminFormContainer from '../AdminFormContainer';
import TextField from '../../fields/TextField/TextField';
import SelectField from '../../fields/SelectField/SelectField';
import DateField from '../../fields/DateField';
import SubmitButton from '../../buttons/SubmitButton';
import {
  loadTimeOptions,
  loadMovieSuggestions,
  loadCitySuggestions,
  loadCinemaByCityOptions,
  loadHallsByCinemaOptions
} from '../../../helpers/loadSelectOptions';

const SessionSection = ({ handleSnackbar }: any) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('20:00');
  const [movieTyped, setMovieTyped] = useState('');
  const [movieSelected, setMovieSelected] = useState('Avengers: Age of Ultron');
  const [cityTyped, setCityTyped] = useState('');
  const [citySelected, setCitySelected] = useState('Minsk');
  const [cinema, setCinema] = useState('12');
  const [hall, setHall] = useState('2');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [movieSuggestions, setMovieSuggestions] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState(null);
  const [cinemaOptions, setCinemaOptions] = useState(null);
  const [hallOptions, setHallOptions] = useState(null);
  const [timeOptions, setTimeOptions] = useState(null);

  useEffect(() => {
    setButtonDisabled(!date || !time || !hall);
    if (!timeOptions) {
      loadTimeOptions(setTimeOptions);
    }
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
    if (cinema) {
      loadHallsByCinemaOptions(cinema, setHallOptions);
    } else {
      setHall('');
    }
  }, [
    date,
    time,
    movieSelected,
    movieTyped,
    citySelected,
    cityTyped,
    cinema,
    hall,
    timeOptions
  ]);

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const body = {
      date,
      time,
      movie: movieSelected,
      hall
    };
    const result = await sessionService.create(body);
    if (result) {
      setTime('');
      setButtonDisabled(true);
      handleSnackbar('New service added', 'success');
    }
  };

  return (
    <AdminFormContainer title="Create Session">
      <form onSubmit={handleSubmit}>
        <DateField
          id="date"
          type="date"
          label="Choose Date"
          value={date}
          handleChange={setDate}
        />
        <SelectField
          id="time"
          type="select"
          options={timeOptions}
          label="Choose time"
          value={time}
          handleChange={setTime}
        />
        <TextField
          id="movie"
          label="Movie Title"
          value={movieSelected === movieTyped ? movieSelected : movieTyped}
          handleChange={setMovieTyped}
          handleSelect={setMovieSelected}
          initialSuggestions={movieSuggestions}
        />
        <TextField
          id="city"
          label="Choose city"
          value={citySelected === cityTyped ? citySelected : cityTyped}
          handleChange={setCityTyped}
          handleSelect={setCitySelected}
          disabled={!movieSelected}
          initialSuggestions={citySuggestions}
        />
        <SelectField
          id="cinema"
          type="select"
          options={cinemaOptions}
          label="Choose Cinema"
          value={cinema}
          handleChange={setCinema}
          disabled={!citySelected}
        />
        <SelectField
          id="hall"
          type="select"
          label="Choose Hall"
          value={hall}
          options={hallOptions}
          handleChange={(value: string) => setHall(value)}
          disabled={!cinema}
        />
        <SubmitButton
          text="Create session"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </form>
    </AdminFormContainer>
  );
};

export default SessionSection;
