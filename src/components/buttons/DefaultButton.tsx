import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const DefaultButton = ({ text, to }) => {
  return (
    <Container>
      <Button variant="outlined" component={Link} to={to}>
        {text}
      </Button>
    </Container>
  );
};

export default DefaultButton;
