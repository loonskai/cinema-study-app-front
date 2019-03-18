import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import {
  containerGreyColor,
  whiteColor,
  mainDarkColor,
  greyColor
} from '../../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  background: ${containerGreyColor};
`;

const StyledTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
  background: ${containerGreyColor};
  color: ${greyColor};
  cursor: pointer;

  &&.tab-selected {
    background: ${whiteColor};
    color: ${mainDarkColor};
  }
`;

const HistorySectionTabs = ({ handleTabSelect, tabSelected }: any) => {
  const upcomingClass = classnames({
    'tab-selected': tabSelected === 'upcoming'
  });

  const pastClass = classnames({
    'tab-selected': tabSelected === 'past'
  });

  return (
    <Container onClick={handleTabSelect}>
      <StyledTab className={upcomingClass} data-name="upcoming">
        Upcoming Events
      </StyledTab>
      <StyledTab className={pastClass} data-name="past">
        Past Events
      </StyledTab>
    </Container>
  );
};

export default HistorySectionTabs;
