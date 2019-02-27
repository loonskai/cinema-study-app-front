import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import styled from 'styled-components';
import { mainDarkColor } from './../../constants';

interface Props {
  text: string;
  to: string;
  handleClick: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Container = styled.div<any>``;

const StyledButton = styled(Button)<any>`
  && {
    background-color: #fff;
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

const SignUpButton = ({ text, to, handleClick }: Props) => {
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
