import React, { useState } from 'react';
import styled from 'styled-components';

import UpdateItemButton from '../buttons/UpdateItemButton';
import { greyColor } from '../../constants';

interface Props {
  list: any[];
}

const StyledItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${greyColor};
`;

const ItemColumn = styled.div`
  margin-left: 0.2rem;
`;

const EntitiesList = ({ list }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const renderItems = (item: any) => {
    const keys = Object.keys(item);
    return keys.map((key: string, index: number) => (
      <ItemColumn>
        <strong>{key}</strong>: {item[key]}
        {index !== keys.length - 1 && ','}
      </ItemColumn>
    ));
  };

  const renderList = () =>
    list.map(item => (
      <StyledItem>
        {renderItems(item)}
        <UpdateItemButton type="edit" />
        <UpdateItemButton type="remove" />
      </StyledItem>
    ));

  return list && list.length ? renderList() : <StyledItem>No items</StyledItem>;
};

export default EntitiesList;
