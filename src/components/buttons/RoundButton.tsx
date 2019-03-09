import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

import { whiteColor } from '../../constants';

const RoundButton = ({ icon, bgColor, type, handleClick }: any) => {
  const Container = styled(Fab)<any>`
    && {
      width: 40px;
      height: 40px;
      margin: 0 0.5rem;
      color: ${whiteColor};
      background-color: ${bgColor};
    }

    &&:hover {
      background-color: ${bgColor};
    }
  `;

  return <Container onClick={() => handleClick(type)}>{icon}</Container>;
};

export default RoundButton;
