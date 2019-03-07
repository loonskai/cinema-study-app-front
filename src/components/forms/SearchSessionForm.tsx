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
  font-size: 20px;
  text-align: center;
`;

const StyledForm = styled.form`
  width: 100%;
`;

const SearchSessionForm = ({ loadSessionsList, sessions }: any) => {
  const [city, setCity] = useState('Minsk');
  const [cinema, setCinema] = useState('');
  const [date, setDate] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [displaySessionsTable, setDisplaySessionsTable] = useState(true); // false default

  useEffect(() => {
    if (city !== '' || cinema !== '') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loadSessionsList();
    setDisplaySessionsTable(true);
    console.log('submit find session');
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

export default connect(
  ({ sessions }: any) => ({ sessions: sessions.data }),
  actions
)(SearchSessionForm);
