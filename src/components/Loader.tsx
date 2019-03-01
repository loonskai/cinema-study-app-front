import React from 'react';
import styled from 'styled-components';

import loader from './../static/images/loader.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  width: 100px;
`;

const Loader = () => {
  return (
    <Container>
      <Spinner dangerouslySetInnerHTML={{ __html: loader }} />
    </Container>
  );
};

export default Loader;
