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

const StyledButton = styled(Button)<any>``;

const DefaultButton = ({ text, to }: { text: string; to: string }) => {
  return (
    <Container>
      <StyledButton variant="outlined" component={Link} to={to}>
        {text}
      </StyledButton>
    </Container>
  );
};

export default DefaultButton;
