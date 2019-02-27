import * as React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import Root from './Root';

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

const Layout = () => {
  return (
    <Container>
      <Header />
      <ContentContainer>
        <Root />
      </ContentContainer>
    </Container>
  );
};

export default Layout;
