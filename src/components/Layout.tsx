import * as React from 'react';
import styled from 'styled-components';

import Header from './Header';

const Container = styled.div`
  background: red;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
