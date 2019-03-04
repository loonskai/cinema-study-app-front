import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UndoIcon from '@material-ui/icons/Undo';

import actions from './../redux/actions/index';
import Logo from './Logo';
import MenuTab from './MenuTab';
import HeaderButton from './buttons/HeaderButton';
import { mainDarkColor, mainColor } from './../constants';
import { th } from 'date-fns/esm/locale';

const StyledAppBar = styled(AppBar)<any>`
  && {
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    flex-direction: row;
    padding: 0 0.625rem;
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

const StyledAuthMenu = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAccountCircle = styled(AccountCircle)<any>`
  && {
    margin: 0 0.5rem;
    cursor: pointer;
  }
`;

const Header = (props: any) => {
  const { isAuth, signOut } = props;

  const handleSignOut = () => {
    console.log('sign out');
  };

  const handleProfileRedirect = () => {
    props.history.push('/profile');
  };

  return (
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
      <StyledAuthMenu>
        {isAuth ? (
          <React.Fragment>
            <StyledAccountCircle onClick={handleProfileRedirect} />
            <HeaderButton
              text="Sign Out"
              icon={<UndoIcon />}
              handleClick={handleSignOut}
            />
          </React.Fragment>
        ) : (
          <HeaderButton text="Sign Up" to="/auth" icon={<VpnKeyIcon />} />
        )}
      </StyledAuthMenu>
    </StyledAppBar>
  );
};

const mapStateToProps = ({ auth }: any) => {
  return {
    isAuth: auth.isAuth
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(Header));
