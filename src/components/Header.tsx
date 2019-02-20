import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MovieFilter from '@material-ui/icons/MovieFilter';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledLogo = styled.div`
  display: flex;
  @media screen and (min-width: 375px) {
    margin-right: 20px;
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-family: 'ZCOOL QingKe HuangYou', cursive;
    display: none;
    @media screen and (min-width: 470px) {
      display: flex;
      align-items: center;
      font-size: 18px;
    }
  }
`;

const StyledMovieFilter = styled(({ color, ...other }) => (
  <MovieFilter classes={{ root: 'colors' }} {...other} />
))`
  &.colors {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    color: ${props => props.color};
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

const StyledTab = styled(Tab)`
  && {
    font-family: 'Bitter', serif;
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
            <StyledLogo>
              <StyledMovieFilter color="red" />
              <StyledTypography component="span" variant="title">
                Cinema App
              </StyledTypography>
            </StyledLogo>
            <Tabs value={location.pathname}>
              <StyledTab
                value={'/'}
                label="Find Movie"
                component={Link}
                to="/"
              />
              <StyledTab
                value={'/profile'}
                label="Buy Ticket"
                component={Link}
                to="/profile"
              />
            </Tabs>
          </StyledToolBar>
          <StyledAvatar>{letter}</StyledAvatar>
        </StyledAppBar>
      </React.Fragment>
    );
  }
}

export default Header;
