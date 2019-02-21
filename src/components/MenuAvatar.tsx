import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

const AvatarContainer = styled(Avatar)`
  && {
    background-color: red;
    margin-left: 10px;
    @media screen and (max-width: 375px) {
      width: 35px;
      height: 35px;
    }
  }
`;

const MenuAvatar = ({ name }: { name: string }) => {
  const firstLetter: string = name[0].toUpperCase();
  return <AvatarContainer>{firstLetter}</AvatarContainer>;
};

export default MenuAvatar;
