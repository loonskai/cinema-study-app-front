import React from 'react';
import styled from 'styled-components';

import BonusSelectItem from './BonusSelectItem';

const Container = styled.div`
  width: 100%;
`;

const BonusContainer = ({
  pickedBonuses,
  loadedBonuses,
  handleBonusesUpdate
}: {
  pickedBonuses: any;
  loadedBonuses: any;
  handleBonusesUpdate: any;
}) => {
  const renderBonuses = () =>
    Object.keys(loadedBonuses).map((key: string) => (
      <BonusSelectItem
        value={pickedBonuses && pickedBonuses[key]}
        key={key}
        bonus={{ [key]: loadedBonuses[key] }}
        handleBonusesUpdate={handleBonusesUpdate}
      />
    ));
  return <Container>{loadedBonuses && renderBonuses()}</Container>;
};

export default BonusContainer;
