import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { mainDarkColor, whiteColor } from '../../constants';

interface Props {
  text: string;
  to?: string;
  handleClick?: any;
  icon?: any;
  disabled?: boolean;
}

const Container = styled.div<any>``;

const StyledButton = styled(Button)<any>`
  && {
    background-color: ${whiteColor};
    color: ${mainDarkColor};
    @media screen and (max-width: 550px) {
      padding: 0.5rem;
      min-width: 2.5rem;
    }
  }
`;

const StyledText = styled.span`
  && {
    margin-left: 0.3rem;
    @media screen and (max-width: 550px) {
      display: none;
    }
  }
`;

const HeaderButton = ({ text, to, icon, handleClick, disabled }: Props) => (
  <Container>
    <StyledButton
      variant="contained"
      component={to && Link}
      to={to}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon}
      <StyledText>{text}</StyledText>
    </StyledButton>
  </Container>
);

export default HeaderButton;
