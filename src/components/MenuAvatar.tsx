import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';

import { whiteColor, mainDarkColor } from './../constants';

const AvatarContainer = styled(Avatar)<any>`
  && {
    background-color: ${whiteColor};
    color: ${mainDarkColor};
    margin-left: 0.625rem;
    @media screen and (max-width: 375px) {
      width: 2.1875rem;
      height: 2.1875rem;
    }
  }
`;

interface Props {
  name: string;
}

const MenuAvatar = ({ name }: Props) => {
  const firstLetter: string = name[0].toUpperCase();
  return <AvatarContainer>{firstLetter}</AvatarContainer>;
};

export default MenuAvatar;
