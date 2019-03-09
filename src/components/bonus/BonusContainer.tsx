import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from '../../ApiService';

const Container = styled.div`
  width: 100%;
`;

const BonusContainer = ({ sessionId }: { sessionId: number }) => {
  const [bonus, setBonusesData] = useState(null);

  useEffect(() => {
    loadBonuses();
  }, [bonus]);

  const loadBonuses = async () => {
    try {
      const data: any = await api.loadSessionBonuses(sessionId);
      setBonusesData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(bonus);
  return <Container>Bonus Services</Container>;
};

export default BonusContainer;
