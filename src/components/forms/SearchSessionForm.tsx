import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

import actions from '../../redux/actions';
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
  const [city, setCity] = useState(initialValues.city);
  const [cinema, setCinema] = useState(initialValues.cinema);
  const [date, setDate] = useState(initialValues.date);
  const [time, setTime] = useState(initialValues.time);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [displaySessionsTable, setDisplaySessionsTable] = useState(false);

  useEffect(() => {
    setButtonDisabled(!(city || cinema));
    if (initialValues.city) {
      loadSessionsList();
      setDisplaySessionsTable(true);
    }
  });

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
          entity="city"
          label="City"
          value={city}
          handleChange={setCity}
        />
        <FieldContainer
          id="cinema"
          type="select"
          entity="cinema"
          label="Cinema"
          value={cinema}
          handleChange={setCinema}
        />
        <FieldContainer
          id="date"
          type="date"
          entity="date"
          label="Date"
          value={date}
          handleChange={setDate}
        />
        <FieldContainer
          id="time"
          type="select"
          entity="time"
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
