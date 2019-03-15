import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

import actions from '../../redux/actions';
import {
  loadCinemaByCityOptions,
  loadCitySuggestions
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
  // loadCinemasByCity,
  sessions,
  initialValues
}: any) => {
  const [citySelected, setCitySelected] = useState(initialValues.city);
  const [cityTyped, setCityTyped] = useState(initialValues.city);
  const [cinemaOptions, setCinemaOptions] = useState(null);
  const [cinema, setCinema] = useState(initialValues.cinema);
  const [date, setDate] = useState(initialValues.date);
  const [time, setTime] = useState(initialValues.time);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [displaySessionsTable, setDisplaySessionsTable] = useState(false);

  const [citySuggestions, setCitySuggestions] = useState(null);

  useEffect(() => {
    // If we come from main page search
    if (initialValues.city) {
      loadSessionsList();
      setDisplaySessionsTable(true);
    }

    if (!citySuggestions) {
      loadCitySuggestions(setCitySuggestions);
    }

    if (citySelected) {
      loadCinemaByCityOptions(citySelected, setCinemaOptions);
      setButtonDisabled(false);
      // loadCinemasByCity(citySelected);
    } else {
      setCinema('');
    }

    if (citySelected !== cityTyped) {
      setCitySelected('');
      setCinema('');
    }
  }, [cityTyped, citySelected]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loadSessionsList();
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
          handleChange={(value: any) => setCinema(value)}
          disabled={!citySelected}
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
          options={null}
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
  const { sessions } = state;
  const { movieId } = initialProps;
  return {
    sessions:
      sessions && sessions.filter((session: any) => session.movieId === movieId)
  };
};

export default connect(
  mapStateToProps,
  actions
)(SearchSessionForm);
