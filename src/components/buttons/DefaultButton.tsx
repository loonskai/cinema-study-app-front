import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const Container = styled.div<any>`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const DefaultButton = ({ text, to }: { text: string; to: string }) => {
  return (
    <Container>
      <Button variant="outlined" component={Link} to={to}>
        {text}
      </Button>
    </Container>
  );
};

export default DefaultButton;
