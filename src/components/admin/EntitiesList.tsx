import React from 'react';
import styled from 'styled-components';

interface Props {
  list: any[];
}

const StyledItem = styled.div`
  padding: 2px;
  border-bottom: 1px solid red;
`;

const EntitiesList = ({ list }: Props) => {
  const renderList = () =>
    list.map(el => <StyledItem>{JSON.stringify(el)}</StyledItem>);

  return list && list.length ? renderList() : <StyledItem>No items</StyledItem>;
};

export default EntitiesList;
