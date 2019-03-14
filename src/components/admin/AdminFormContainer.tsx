import React from 'react';
import styled from 'styled-components';

import PageTitle from '../PageTitle';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1.5rem;
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
