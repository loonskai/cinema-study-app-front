import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 2.1875rem;
  height: 2.1875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseModalButton = ({ handleClick }: any) => {
  return (
    <Container onClick={handleClick}>
      <CloseIcon fontSize="large" />
    </Container>
  );
};

export default CloseModalButton;
