import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

import { whiteColor } from '../../constants';

const RoundButton = ({ icon, bgColor, type, handleClick, disabled }: any) => {
  const Container = styled(Fab)<any>`
    && {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 0.5rem;
      color: ${whiteColor};
      background-color: ${bgColor};
    }

    &&:hover {
      background-color: ${bgColor};
    }
  `;

  return (
    <Container onClick={() => handleClick(type)} disabled={disabled}>
      {icon}
    </Container>
  );
};

export default RoundButton;
