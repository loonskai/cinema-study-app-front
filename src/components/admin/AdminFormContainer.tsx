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
`;

const FormContainer = styled.div`
  padding: 1rem;
`;

const AdminFormContainer = ({ children, title }: any) => {
  return (
    <Container>
      <PageTitle text={title} />
      <FormContainer>{children}</FormContainer>
    </Container>
  );
};

export default AdminFormContainer;
