import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';

import Logo from './Logo';
import MenuTab from './MenuTab';
import MenuAvatar from './MenuAvatar';

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

const StyledToolBar = styled(Toolbar)`
  && {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Header = () => {
  return (
    <StyledAppBar color="#fff">
      <StyledToolBar>
        <Logo />
        <Tabs value={location.pathname}>
          <MenuTab value={'/'} label="Find Movie" to="/" />
          <MenuTab value={'/profile'} label="Buy Ticket" to="/profile" />
        </Tabs>
      </StyledToolBar>
      <MenuAvatar name="John" />
    </StyledAppBar>
  );
};

export default Header;
