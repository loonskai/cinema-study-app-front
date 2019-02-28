import React from 'react';
import styled from 'styled-components';
import MovieFilter from '@material-ui/icons/MovieFilter';
import Typography from '@material-ui/core/Typography';

import { mainColor, whiteColor } from './../constants';

const LogoContainer = styled.div`
  display: flex;
  @media screen and (min-width: 375px) {
    margin-right: 1.25rem;
  }
`;

const StyledIcon = styled(MovieFilter)<any>`
  && {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.625rem;
    color: ${mainColor};
  }
`;

const StyledText = styled(Typography)<any>`
  && {
    font-family: 'ZCOOL QingKe HuangYou', cursive;
    display: none;
    color: ${whiteColor};
    @media screen and (min-width: 470px) {
      display: flex;
      align-items: center;
      font-size: 1.125rem;
    }
  }
`;

const Logo = () => (
  <LogoContainer>
    <StyledIcon />
    <StyledText component="span" variant="title">
      Cinema App
    </StyledText>
  </LogoContainer>
);

export default Logo;
