import React, { useState } from 'react';
import styled from 'styled-components';

import NavPanel from '../components/admin/NavPanel';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AdminContent = styled.div`
  display: flex;
  padding: 1.5rem;
`;

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('add-cinema');
  return (
    <Container>
      <NavPanel
        selectedTab={selectedTab}
        handleChange={(event: any, value: string) => setSelectedTab(value)}
      />
      <AdminContent>content</AdminContent>
    </Container>
  );
};

export default Admin;
