import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

import Session from '../../classes/Session';
import actions from '../../redux/actions';
import {
  loadCinemaByCityOptions,
  loadTimeOptions,
  loadCitySuggestions,
  loadHallsByCinemaOptions
} from '../../helpers/loadSelectOptions';
import FieldContainer from '../fields/FieldContainer';
import SubmitButton from '../buttons/SubmitButton';
import SessionsTable from '../SessionsTable';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledTitle = styled.h2`
  width: 100%;
  font-size: 1.25rem;
  text-align: center;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const SearchSessionForm = ({
  loadSessionsList,
  sessions,
  initialValues
}: any) => {
  const [date, setDate] = useState(initialValues.date);
  const [time, setTime] = useState(initialValues.time);
  const [hall, setHall] = useState('');
  const [citySelected, setCitySelected] = useState(initialValues.city);
  const [cityTyped, setCityTyped] = useState(initialValues.city);
  const [cinema, setCinema] = useState(initialValues.cinema);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [displaySessionsTable, setDisplaySessionsTable] = useState(false);

  const [timeOptions, setTimeOptions] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState(null);
  const [cinemaOptions, setCinemaOptions] = useState(null);
  const [hallOptions, setHallOptions] = useState(null);

  useEffect(() => {
    // If we come from main page search
    if (initialValues.city) {
      loadSessionsList();
      setDisplaySessionsTable(true);
    }

    if (!timeOptions) {
      loadTimeOptions(setTimeOptions);
    }

    if (!citySuggestions) {
      loadCitySuggestions(setCitySuggestions);
    }

    if (citySelected) {
      loadCinemaByCityOptions(citySelected, setCinemaOptions);
      setButtonDisabled(false);
    } else {
      setCinema('');
    }

    if (citySelected !== cityTyped) {
      setCitySelected('');
      setCinema('');
    }

    if (cinema) {
      loadHallsByCinemaOptions(cinema, setHallOptions);
    } else {
      setHall('');
    }
  }, [cityTyped, citySelected, cinema, hall, timeOptions]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const options = {
      hall,
      date,
      time
    };
    loadSessionsList(options);
    setDisplaySessionsTable(true);
  };

  return (
    <Container>
      <StyledTitle>Where can I watch it?</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <FieldContainer
          id="city"
          type="text"
          icon="city"
          label="City"
          value={citySelected === cityTyped ? citySelected : cityTyped}
          handleChange={setCityTyped}
          handleSelect={setCitySelected}
          initialSuggestions={citySuggestions}
        />
        <FieldContainer
          id="cinema"
          type="select"
          options={cinemaOptions}
          icon="cinema"
          label="Cinema"
          value={cinema}
          handleChange={(value: string) => setCinema(value)}
          disabled={!citySelected}
        />
        <FieldContainer
          id="hall"
          type="select"
          icon="cinema"
          label="Hall"
          value={hall}
          options={hallOptions}
          handleChange={(value: string) => setHall(value)}
          disabled={!cinema}
        />
        <FieldContainer
          id="date"
          type="date"
          icon="date"
          label="Date"
          value={date}
          handleChange={setDate}
        />
        <FieldContainer
          id="time"
          type="select"
          options={timeOptions}
          icon="time"
          label="Time"
          value={time}
          handleChange={setTime}
        />
        <SubmitButton
          text="Search"
          icon={<SearchIcon />}
          disabled={buttonDisabled}
        />
      </StyledForm>
      {displaySessionsTable && <SessionsTable sessions={sessions} />}
    </Container>
  );
};

const mapStateToProps = (state: any, initialProps: any) => {
  const { sessions }: { sessions: Session[] } = state;
  const { movieID } = initialProps;
  return {
    sessions:
      sessions && sessions.filter(session => session.movieID === movieID)
  };
};

export default connect(
  mapStateToProps,
  actions
)(SearchSessionForm);
