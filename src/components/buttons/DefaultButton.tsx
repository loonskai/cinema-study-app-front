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

const StyledButton = styled(Button)<any>`
  && {
    background: ${({ color }) => color};
  }
`;

const DefaultButton = ({
  text,
  to,
  color
}: {
  text: string;
  to: string;
  color?: string;
}) => {
  return (
    <Container>
      <StyledButton variant="outlined" component={Link} to={to} color={color}>
        {text}
      </StyledButton>
    </Container>
  );
};

export default DefaultButton;
