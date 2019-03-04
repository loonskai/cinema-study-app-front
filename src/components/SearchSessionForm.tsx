import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

import actions from './../redux/actions';
import SearchField from './../components/SearchField';
import SubmitButton from './../components/buttons/SubmitButton';
import SessionsTable from './../components/SessionsTable';

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
  const [displaySessionsTable, setDisplaySessionsTable] = useState(false);

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
        <SearchField
          id="city"
          type="text"
          entity="city"
          label="City"
          value={city}
          handleChange={setCity}
        />
        <SearchField
          id="cinema"
          type="select"
          entity="cinema"
          label="Cinema"
          value={cinema}
          handleChange={setCinema}
        />
        <SearchField
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
