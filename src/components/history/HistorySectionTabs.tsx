import React, { useState } from 'react';
import styled from 'styled-components';

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
  cursor: pointer;
`;

const StyledTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
  background: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? whiteColor : containerGreyColor};
  color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? mainDarkColor : greyColor};
`;

const HistorySectionTabs = () => {
  const [tabSelected, setTebSelected] = useState('upcoming');

  const handleTabSelect = (e: any) => {
    const { name }: { name: string } = e.target.dataset;
    if (tabSelected === name) return;
    switch (name) {
      case 'upcoming':
      case 'past': {
        setTebSelected(name);
      }
      default:
        return null;
    }
  };

  return (
    <Container onClick={handleTabSelect}>
      <StyledTab isSelected={tabSelected === 'upcoming'} data-name="upcoming">
        Upcoming Events
      </StyledTab>
      <StyledTab isSelected={tabSelected === 'past'} data-name="past">
        Past Events
      </StyledTab>
    </Container>
  );
};

export default HistorySectionTabs;
