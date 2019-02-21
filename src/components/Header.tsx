import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';

import Logo from './Logo';
import MenuTab from './MenuTab';

const StyledAppBar = styled(({ color, ...other }) => (
  <AppBar
    color="default"
    position="static"
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

const StyledAvatar = styled(Avatar)`
  && {
    background-color: red;
    margin-left: 10px;
    @media screen and (max-width: 375px) {
      width: 35px;
      height: 35px;
    }
  }
`;

class Header extends React.Component {
  state = {
    value: 0
  };

  handleChange = (e, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const letter = 'S'; // Here should be first letter of user name
    return (
      <React.Fragment>
        <StyledAppBar color="#fff">
          <StyledToolBar>
            <Logo />
            <Tabs value={location.pathname}>
              <MenuTab value={'/'} label="Find Movie" to="/" />
              <MenuTab value={'/profile'} label="Buy Ticket" to="/profile" />
            </Tabs>
          </StyledToolBar>
          <StyledAvatar>{letter}</StyledAvatar>
        </StyledAppBar>
      </React.Fragment>
    );
  }
}

export default Header;
