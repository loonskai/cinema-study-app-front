import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from '../../ApiService';
import BonusSelectItem from './BonusSelectItem';

const Container = styled.div`
  width: 100%;
`;

const BonusContainer = ({
  sessionId,
  handleChangeOrderBonus
}: {
  sessionId: number;
  handleChangeOrderBonus: any;
}) => {
  const [bonuses, setBonusesData]: [any, any] = useState(null);

  useEffect(() => {
    loadBonuses();
  }, [bonuses]);

  const loadBonuses = async () => {
    try {
      const data: any = await api.loadSessionBonuses(sessionId);
      setBonusesData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderBonuses = () => {
    console.log(bonuses);
    const bonusesKeys = Object.keys(bonuses);
    return bonusesKeys.map((key: string) => (
      <BonusSelectItem
        key={key}
        title={key}
        bonus={bonuses[key]}
        handleChange={handleChangeOrderBonus}
      />
    ));
  };

  return <Container>{bonuses && renderBonuses()}</Container>;
};

export default BonusContainer;
