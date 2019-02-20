import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';

const StyledAppBar = styled(({ color, ...other }) => (
  <AppBar
    color="default"
    classes={{ colorDefault: 'default-colors' }}
    {...other}
  />
))`
  flex-grow: 1;
  background: #f57c00;

  &.default-colors {
    background-color: ${props => props.color};
  }
`;

const Header = () => {
  return (
    <React.Fragment>
      <StyledAppBar color="red">
        <IconButton aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <NavLink to="/">Main Page</NavLink>
          </Typography>
          <Typography variant="h6" color="inherit">
            <NavLink to="/profile">Profile</NavLink>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </StyledAppBar>
    </React.Fragment>
  );
};

export default Header;
