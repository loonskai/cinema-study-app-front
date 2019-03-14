import React, { useState } from 'react';
import styled from 'styled-components';

import NavPanel from '../components/admin/NavPanel';
import AddCinemaForm from '../components/admin/AddCinemaForm';
import AddHallForm from '../components/admin/AddHallForm';
import AddServicesForm from '../components/admin/AddServicesForm';
import CreateSessionForm from '../components/admin/CreateSessionForm';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('add-cinema');

  const getSelectedForm = () => {
    switch (selectedTab) {
      case 'add-cinema':
        return <AddCinemaForm />;
      case 'add-hall':
        return <AddHallForm />;
      case 'add-services':
        return <AddServicesForm />;
      case 'create-session':
        return <CreateSessionForm />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <NavPanel
        selectedTab={selectedTab}
        handleChange={(event: any, value: string) => setSelectedTab(value)}
      />
      {getSelectedForm()}
    </Container>
  );
};

export default Admin;
