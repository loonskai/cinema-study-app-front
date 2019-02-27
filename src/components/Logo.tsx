import * as React from 'react';
import MovieFilter from '@material-ui/icons/MovieFilter';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { mainColor } from './../constants';

const LogoContainer = styled.div`
  display: flex;
  @media screen and (min-width: 375px) {
    margin-right: 20px;
  }
`;

const StyledIcon = styled(({ color, ...other }) => (
  <MovieFilter classes={{ root: 'colors' }} {...other} />
))`
  &.colors {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    color: ${props => props.color};
  }
`;

const StyledText = styled(Typography)<any>`
  && {
    font-family: 'ZCOOL QingKe HuangYou', cursive;
    display: none;
    color: #fff;
    @media screen and (min-width: 470px) {
      display: flex;
      align-items: center;
      font-size: 18px;
    }
  }
`;

const Logo = () => (
  <LogoContainer>
    <StyledIcon color={mainColor} />
    <StyledText component="span" variant="title">
      Cinema App
    </StyledText>
  </LogoContainer>
);

export default Logo;
