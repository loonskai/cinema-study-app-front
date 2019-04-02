import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';

import { TabType } from '../../../enums';
import { mainDarkColor, mainColor } from '../../../constants';

const Container = styled.div`
  width: 100%;
`;

const StyledTabs = styled(Tabs)<any>`
  && .indicator {
    background-color: ${mainColor};
  }
`;

const StyledTab = styled(Tab)<any>`
  &&.root {
    color: rgba(0, 0, 0, 0.7);
  }

  &&.selected {
    color: ${mainDarkColor};
  }

  @media screen and (max-width: 756px) {
    &&.root {
      padding: 0;
      min-width: 20px !important;
    }

    .label-container {
      display: none;
    }
  }
`;

const NavPanel = ({ selectedTab, handleChange }: any) => {
  return (
    <Container>
      <Paper>
        <StyledTabs
          value={selectedTab}
          onChange={handleChange}
          variant="fullWidth"
          classes={{ indicator: 'indicator' }}
        >
          <StyledTab
            icon={<MovieCreationIcon />}
            label="Add cinema"
            value={TabType.cinema}
            classes={{
              root: 'root',
              selected: 'selected',
              labelContainer: 'label-container'
            }}
          />
          <StyledTab
            icon={<VideoLabelIcon />}
            label="Add hall"
            value={TabType.hall}
            classes={{
              root: 'root',
              selected: 'selected',
              labelContainer: 'label-container'
            }}
          />
          <StyledTab
            icon={<LocalMoviesIcon />}
            label="Add movie"
            value={TabType.movie}
            classes={{
              root: 'root',
              selected: 'selected',
              labelContainer: 'label-container'
            }}
          />
          <StyledTab
            icon={<RoomServiceIcon />}
            label="Add services"
            value={TabType.services}
            classes={{
              root: 'root',
              selected: 'selected',
              labelContainer: 'label-container'
            }}
          />
          <StyledTab
            icon={<AccessTimeIcon />}
            label="Create session"
            value={TabType.session}
            classes={{
              root: 'root',
              selected: 'selected',
              labelContainer: 'label-container'
            }}
          />
        </StyledTabs>
      </Paper>
    </Container>
  );
};

export default NavPanel;
