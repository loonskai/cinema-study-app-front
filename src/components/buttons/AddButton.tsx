import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

import { whiteColor, mainDarkColor } from '../../constants';

const Container = styled(Fab)<any>`
  && {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.5rem;
    background-color: ${mainDarkColor};
    color: ${whiteColor};
  }

  &&:hover {
    background-color: ${mainDarkColor};
  }
`;

const AddButton = ({ icon, handleClick, id }: any) => {
  console.log(id);
  return <Container onClick={() => handleClick(id)}>{icon}</Container>;
};

export default AddButton;
