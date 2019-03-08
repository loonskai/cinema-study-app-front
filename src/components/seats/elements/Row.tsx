import React from 'react';
import styled from 'styled-components';

const StyledRow = styled.div<any>`
  margin: 0 auto;
  margin-bottom: ${({ lastInSection }: { lastInSection: boolean }) =>
    lastInSection && '1rem'};
  display: flex;
  justify-content: center;
`;

export default StyledRow;
