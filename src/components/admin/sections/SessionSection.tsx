import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import Session from '../../../classes/Session';
import sessionService from '../../../services/Session';
import AdminFormContainer from '../AdminFormContainer';
import TextField from '../../fields/TextField/TextField';
import SelectField from '../../fields/SelectField/SelectField';
import DateField from '../../fields/DateField';
import SubmitButton from '../../buttons/SubmitButton';
import CategoryPriceInputs from '../elements/CategoryPriceInputs';
import AdminListItem from '../elements/AdminListItem';
import {
  loadTimeOptions,
  loadMovieSuggestions,
  loadCitySuggestions,
  loadCinemaByCityOptions,
  loadHallsByCinemaOptions
} from '../../../helpers/loadSelectOptions';
import parseFieldsFromEntity from '../../../helpers/parseFieldsFromEntity';
import { PriceObj } from '../elements/CategoryPriceInputs';

const SessionSection = ({ handleSnackbar }: any) => {
  const [sessionsList, setSessionsList] = useState<Session[] | null>(null);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('20:00');
  const [movieTyped, setMovieTyped] = useState('');
  const [movieSelected, setMovieSelected] = useState('Avengers: Age of Ultron');
  const [cityTyped, setCityTyped] = useState('');
  const [citySelected, setCitySelected] = useState('Minsk');
  const [cinema, setCinema] = useState('12');
  const [hall, setHall] = useState('2');
  const [rowPrices, setRowPrices] = useState<{
    [key: string]: PriceObj;
  } | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [movieSuggestions, setMovieSuggestions] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState(null);
  const [cinemaOptions, setCinemaOptions] = useState(null);
  const [hallOptions, setHallOptions] = useState(null);
  const [timeOptions, setTimeOptions] = useState(null);

  useEffect(() => {
    setButtonDisabled(
      !date ||
        !time ||
        !hall ||
        !movieSelected ||
        !rowPrices ||
        Object.values(rowPrices).some(category => !category.price)
    );
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
    if (!sessionsList) {
      sessionService.getAll({}, setSessionsList);
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
    rowPrices,
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
      hall,
      prices: rowPrices
    };
    console.log(rowPrices);
    // const result = await sessionService.create(body);
    const result = false;
    if (result) {
      setTime('');
      setButtonDisabled(true);
      handleSnackbar('New service added', 'success');
      sessionService.getAll({}, setSessionsList);
    }
  };

  const handleUpdate = async (id: number, inputValues: any) => {};

  const handleRemove = async (id: number) => {
    const result = await sessionService.delete(id);
    if (!result) {
      handleSnackbar('Unable to delete session', 'error');
    } else {
      handleSnackbar('Session deleted', 'warning');
      await sessionService.getAll({}, setSessionsList);
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
        {hall ? (
          <CategoryPriceInputs
            hallID={+hall}
            prices={rowPrices}
            handleSetPrices={(prices: { [key: string]: PriceObj }) =>
              setRowPrices(prices)
            }
          />
        ) : (
          <div>Please, choose a hall</div>
        )}
        <SubmitButton
          text="Create session"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </form>
      {sessionsList &&
        sessionsList.map(item => (
          <AdminListItem
            properties={parseFieldsFromEntity(item as any)}
            key={item.id.toString()}
            id={item.id}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
            handleSnackbar={handleSnackbar}
          />
        ))}
    </AdminFormContainer>
  );
};

export default SessionSection;
