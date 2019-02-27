import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';

import Logo from './Logo';
import MenuTab from './MenuTab';
// import MenuAvatar from './MenuAvatar';
import SignUpButton from './buttons/SignUpButton';

const StyledAppBar = styled(({ color, ...other }) => (
  <AppBar
    color="default"
    position="fixed"
    classes={{ colorDefault: 'default-colors', root: 'root' }}
    {...other}
  />
))`
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  &.root {
    flex-direction: row;
    padding: 0 10px;
  }
  &.default-colors {
    background-color: ${props => props.color};
  }
`;

const StyledToolBar = styled(Toolbar)<any>`
  && {
    padding-left: 0;
    padding-right: 0;
  }
`;

const handleSignUp = () => {
  console.log('auth page');
};

const Header = () => {
  return (
    <StyledAppBar color="#fff">
      <StyledToolBar>
        <Logo />
        <Tabs value={location.pathname}>
          <MenuTab value={'/'} label="Main Page" to="/" />
          <MenuTab value={'/movies'} label="Movies" to="/movies" />
        </Tabs>
      </StyledToolBar>
      {/* <MenuAvatar name="John" /> */}
      <SignUpButton text="Sign Up" handleClick={handleSignUp} />
    </StyledAppBar>
  );
};

export default Header;
