import React, { useState } from 'react';
import styled from 'styled-components';

import { TabType } from '../enums';

import { SnackbarContext } from '../Layout';
import NavPanel from '../components/admin/elements/NavPanel';
import CinemaSection from '../components/admin/sections/CinemaSection';
import HallSection from '../components/admin/sections/HallSection';
import MovieSection from '../components/admin/sections/MovieSection';
import BonusSection from '../components/admin/sections/BonusSection';
import SessionSection from '../components/admin/sections/SessionSection';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState(TabType.session);

  const getSelectedForm = (handleSnackbar: any) => {
    switch (selectedTab) {
      case TabType.cinema:
        return <CinemaSection handleSnackbar={handleSnackbar} />;
      case TabType.hall:
        return <HallSection handleSnackbar={handleSnackbar} />;
      case TabType.movie:
        return <MovieSection handleSnackbar={handleSnackbar} />;
      case TabType.bonus:
        return <BonusSection handleSnackbar={handleSnackbar} />;
      case TabType.session:
        return <SessionSection handleSnackbar={handleSnackbar} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <NavPanel
        selectedTab={selectedTab}
        handleChange={(
          event: React.FormEvent<HTMLInputElement>,
          value: TabType
        ) => setSelectedTab(value)}
      />
      <SnackbarContext.Consumer>
        {({ handleSnackbar }: any) => getSelectedForm(handleSnackbar)}
      </SnackbarContext.Consumer>
    </Container>
  );
};

export default Admin;
