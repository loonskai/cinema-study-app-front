import React, { useState } from 'react';
import styled from 'styled-components';

import NavPanel from '../components/admin/NavPanel';
import AddCinemaForm from '../components/admin/AddCinemaForm';
import AddHallForm from '../components/admin/AddHallForm';
import AddMovieForm from '../components/admin/AddMovieForm';
import AddServicesForm from '../components/admin/AddServicesForm';
import CreateSessionForm from '../components/admin/CreateSessionForm';
import { SnackbarContext } from '../Layout';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('add-movie');

  const getSelectedForm = (handleSnackbar: any) => {
    switch (selectedTab) {
      case 'add-cinema':
        return <AddCinemaForm handleSnackbar={handleSnackbar} />;
      case 'add-hall':
        return <AddHallForm handleSnackbar={handleSnackbar} />;
      case 'add-movie':
        return <AddMovieForm handleSnackbar={handleSnackbar} />;
      case 'add-services':
        return <AddServicesForm handleSnackbar={handleSnackbar} />;
      case 'create-session':
        return <CreateSessionForm handleSnackbar={handleSnackbar} />;
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
      <SnackbarContext.Consumer>
        {({ handleSnackbar }: any) => getSelectedForm(handleSnackbar)}
      </SnackbarContext.Consumer>
    </Container>
  );
};

export default Admin;
