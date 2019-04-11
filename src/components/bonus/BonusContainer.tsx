import React from 'react';
import styled from 'styled-components';

import Bonus from '../../classes/Bonus';
import BonusSelectItem from './BonusSelectItem';

const Container = styled.div`
  width: 100%;
`;

interface Props {
  bonuses: {
    [key: string]: {
      quantity: number;
      price: number;
    };
  };
  loadedBonuses: Bonus[];
  handleBonusesUpdate: any;
}

const BonusContainer: React.FC<Props> = ({
  bonuses,
  loadedBonuses,
  handleBonusesUpdate
}) => {
  const renderBonuses = () =>
    loadedBonuses.map((loadedBonus, index: number) => (
      <BonusSelectItem
        value={bonuses[loadedBonus.title].quantity}
        key={index.toString()}
        bonus={loadedBonus}
        handleBonusesUpdate={handleBonusesUpdate}
      />
    ));
  return <Container>{loadedBonuses && renderBonuses()}</Container>;
};

export default BonusContainer;
