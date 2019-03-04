import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircle from '@material-ui/icons/AccountCircle';
import UndoIcon from '@material-ui/icons/Undo';

import actions from './../redux/actions/index';
import HeaderButton from './buttons/HeaderButton';

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

const MenuAuth = (props: any) => {
  const { isAuth, signOut } = props;

  const handleSignOut = async () => {
    await signOut();
    console.log('succesfully signed out');
  };

  const handleProfileRedirect = () => {
    props.history.push('/profile');
  };

  return (
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
)(withRouter(MenuAuth));
