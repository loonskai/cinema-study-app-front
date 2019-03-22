import React from 'react';
import styled from 'styled-components';

import PageTitle from '../PageTitle';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1.5rem 0;
  box-sizing: border-box;

  & form {
    max-width: 550px;
    margin: 1rem;
  }
`;

const AdminFormContainer = ({ children, title }: any) => (
  <Container>
    <PageTitle text={title} />
    <div>{children}</div>
  </Container>
);

export default AdminFormContainer;
