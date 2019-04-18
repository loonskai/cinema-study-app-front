import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
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

  &&.selected {
    background-color: ${whiteColor};
    color: ${mainDarkColor};
    box-shadow: none;
  }

  &&.selected:hover {
    background-color: ${whiteColor};
  }

  @media screen and (max-width: 556px) {
    && {
      margin: 1rem 0;
    }
  }
`;

const AddButton = ({ icon, handleClick, isSelected, id }: any) => {
  const ButtonClass = classnames({
    selected: isSelected
  });
  return (
    <Container
      isSelected={isSelected}
      onClick={() => handleClick(id)}
      className={ButtonClass}
    >
      {icon}
    </Container>
  );
};

export default AddButton;
