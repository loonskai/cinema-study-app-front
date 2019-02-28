import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { mainDarkColor, whiteColor } from './../../constants';

interface Props {
  text: string;
  to: string;
}

const Container = styled.div<any>``;

const StyledButton = styled(Button)<any>`
  && {
    background-color: ${whiteColor};
    color: ${mainDarkColor};
    @media screen and (max-width: 470px) {
      padding: 6px;
      min-width: 40px;
    }
  }
`;

const StyledText = styled.span<any>`
  && {
    margin-left: 5px;
    @media screen and (max-width: 470px) {
      display: none;
    }
  }
`;

const SignUpButton = ({ text, to }: Props) => {
  return (
    <Container>
      <StyledButton variant="contained" component={Link} to={to}>
        <VpnKeyIcon />
        <StyledText>{text}</StyledText>
      </StyledButton>
    </Container>
  );
};

export default SignUpButton;
