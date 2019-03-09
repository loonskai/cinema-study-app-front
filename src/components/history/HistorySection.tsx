import React from 'react';
import styled from 'styled-components';

import HistorySectionTabs from './HistorySectionTabs';
import { greyColor } from '../../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  border-radius: 10px;
  border: 1px solid ${greyColor};
  overflow: hidden;
`;

const HistorySection = () => {
  return (
    <Container>
      <HistorySectionTabs />
    </Container>
  );
};

export default HistorySection;
