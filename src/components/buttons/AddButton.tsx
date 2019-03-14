import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';

import { whiteColor, mainDarkColor } from '../../constants';

const Container = styled(Fab)<any>`
  && {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.5rem;
    background-color: ${({ isSelected }: { isSelected: boolean }) =>
      isSelected ? whiteColor : mainDarkColor};
    color: ${({ isSelected }: { isSelected: boolean }) =>
      isSelected ? mainDarkColor : whiteColor};
    box-shadow: ${({ isSelected }: { isSelected: boolean }) =>
      isSelected && 'none'};
  }

  &&:hover {
    background-color: ${({ isSelected }: { isSelected: boolean }) =>
      isSelected ? whiteColor : mainDarkColor};
  }
`;

const AddButton = ({ icon, handleClick, isSelected, id }: any) => {
  return (
    <Container isSelected={isSelected} onClick={() => handleClick(id)}>
      {icon}
    </Container>
  );
};

export default AddButton;
