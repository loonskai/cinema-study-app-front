import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { whiteColor } from '../../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.625rem 0;
`;

const StyledButton = styled(Button)<any>`
  && {
    background: ${whiteColor};
  }
`;

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
