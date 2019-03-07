import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  height: 30px;
  margin-left: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  font-size: 0.75rem;
`;

const RowTitle = ({ row }: { row: number }) => <Container>row {row}</Container>;

export default RowTitle;
