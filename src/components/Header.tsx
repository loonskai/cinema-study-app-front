import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';

import Logo from './Logo';
import MenuTab from './MenuTab';
// import MenuAvatar from './MenuAvatar';
import SignUpButton from './buttons/SignUpButton';
import { mainDarkColor, mainColor } from './../constants';

const StyledAppBar = styled(AppBar)<any>`
  && {
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    flex-direction: row;
    padding: 0 10px;
    background-color: ${mainDarkColor};
  }
`;

const StyledToolBar = styled(Toolbar)<any>`
  && {
    padding-left: 0;
    padding-right: 0;
  }
`;

const StyledTabs = styled(Tabs)<any>`
  && .indicator {
    background-color: ${mainColor};
  }
`;

const Header = () => (
  <StyledAppBar position="fixed">
    <StyledToolBar>
      <Logo />
      <StyledTabs
        value={location.pathname}
        classes={{ indicator: 'indicator' }}
      >
        <MenuTab value={'/'} label="Main Page" to="/" />
        <MenuTab value={'/movies'} label="Movies" to="/movies" />
      </StyledTabs>
    </StyledToolBar>
    {/* <MenuAvatar name="John" /> */}
    <SignUpButton text="Sign Up" to="/auth" />
  </StyledAppBar>
);

export default Header;
