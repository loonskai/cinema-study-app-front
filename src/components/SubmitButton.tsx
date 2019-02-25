import * as React from 'react';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  && {
    min-width: 220px;
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

const SubmitButton = ({ text, handleClick, disabled }) => {
  return (
    <Container>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={disabled}
      >
        <SearchIcon />
        {text}
      </StyledButton>
    </Container>
  );
};

export default SubmitButton;
