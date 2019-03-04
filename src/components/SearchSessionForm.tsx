import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

import SearchField from './../components/SearchField';
import SubmitButton from './../components/buttons/SubmitButton';

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

const SearchSessionForm = () => {
  const [city, setCity] = useState('');
  const [cinema, setCinema] = useState('');
  const [date, setDate] = useState(new Date());
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (city !== '' || cinema !== '') {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit find session');
  };

  return (
    <Container>
      <StyledTitle>Where can I watch it</StyledTitle>
      <StyledForm onSubmit={handleSubmit}>
        <SearchField
          id="city"
          type="text"
          entity="city"
          label="Where do you live?"
          value={city}
          handleChange={setCity}
        />
        <SearchField
          id="cinema"
          type="select"
          entity="cinema"
          label="Choose Cinema"
          value={cinema}
          handleChange={setCinema}
        />
        <SearchField
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
      </StyledForm>
    </Container>
  );
};

export default SearchSessionForm;
