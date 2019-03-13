import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { whiteColor, mainDarkColor, mainDarkColorSub } from '../../constants';

interface Props {
  text: string;
  handleClick?: (e: React.FormEvent<HTMLInputElement>) => void;
  disabled: boolean;
  icon: any;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled(Button)<any>`
  && {
    min-width: 13.75rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    background-color: ${mainDarkColor};
    color: ${whiteColor};
  }

  &&:hover {
    background-color: ${mainDarkColorSub};
  }
`;

const SubmitButton = ({ text, disabled, icon }: Props) => (
  <Container>
    <StyledButton
      variant="contained"
      color="primary"
      disabled={disabled}
      type="submit"
    >
      {icon}
      {text}
    </StyledButton>
  </Container>
);

export default SubmitButton;
