import * as React from 'react';
import styled from 'styled-components';

import Header from './Header';

const Container = styled.div`
  height: inherit;
  padding-top: 48px;
  font-family: 'Bitter', serif;
  background: #f7f7f7;
  @media screen and (min-width: 600px) {
    padding-top: 64px;
  }
`;

const ContentContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
  margin: 0 auto;
  background: #fff;
  @media screen and (min-width: 1378px) {
    max-width: 1200px;
  }
`;

interface Props {
  children: React.ReactChild;
}

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default Layout;
