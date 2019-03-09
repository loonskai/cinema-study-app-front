import React from 'react';
import styled from 'styled-components';

import BonusSelectItem from './BonusSelectItem';

const Container = styled.div`
  width: 100%;
`;

const BonusContainer = ({
  loadedBonuses,
  handleBonusesUpdate
}: {
  loadedBonuses: any;
  handleBonusesUpdate: any;
}) => {
  const renderBonuses = () => {
    return Object.keys(loadedBonuses).map((key: string) => (
      <BonusSelectItem
        key={key}
        bonus={{ [key]: loadedBonuses[key] }}
        handleBonusesUpdate={handleBonusesUpdate}
      />
    ));
  };

  return <Container>{loadedBonuses && renderBonuses()}</Container>;
};

export default BonusContainer;
