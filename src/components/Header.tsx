import * as React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';

const Container = styled.header`
  background: red;
`;

const Header = props => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            <NavLink to="/">Main Page</NavLink>
          </Typography>
          <Typography variant="h6" color="inherit">
            <NavLink to="/profile">Profile</NavLink>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
