import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MovieFilter from '@material-ui/icons/MovieFilter';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

const StyledLogo = styled.div``;

const StyledMovieFilter = styled(({ color, ...other }) => (
  <MovieFilter classes={{ root: 'colors' }} {...other} />
))`
  &.colors {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    color: ${props => props.color};
    @media screen and (min-width: 375px) {
      margin-right: 20px;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  && {
    background-color: red;
    margin-left: 10px;
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
            </StyledLogo>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Find Movie" />
              <Tab label="Buy Ticket" />
            </Tabs>
          </StyledToolBar>
          <StyledAvatar>{letter}</StyledAvatar>
        </StyledAppBar>
      </React.Fragment>
    );
  }
}

export default Header;
