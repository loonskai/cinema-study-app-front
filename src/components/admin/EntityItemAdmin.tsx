import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import UpdateItemButton from '../buttons/UpdateItemButton';
import { greyColor } from '../../constants';

interface Props {
  item: any;
}

const StyledItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${greyColor};
`;

const ItemsContainer = styled.div`
  flex: 1;
`;

const ItemColumn = styled.div`
  margin-left: 0.2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  justify-content: center;
  align-items: center;
`;

const EntityItemAdmin = ({ item }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [values, setValues] = useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const renderItems = (item: any) => {
    console.log(values);
    const keys = Object.keys(item);
    return keys.map((key: string) => (
      <ItemColumn>
        <strong>{key}</strong>:{' '}
        {editMode ? (
          <input
            type="text"
            name={key}
            value={values[key]}
            onChange={handleChange}
          />
        ) : (
          <span>{item[key]}</span>
        )}
      </ItemColumn>
    ));
  };

  const editItem = () => {
    console.log('edit item');
    setEditMode(true);
  };

  const cancelEdit = () => {
    console.log('cancel item');
    setEditMode(false);
  };

  const saveItem = () => {
    console.log('save item');
    setEditMode(false);
  };

  const removeItem = () => {
    console.log('remove item');
  };

  return (
    <StyledItem>
      <ItemsContainer>{renderItems(item)}</ItemsContainer>
      <ButtonsContainer>
        {editMode ? (
          <Fragment>
            <UpdateItemButton handleClick={saveItem} type="save" />
            <UpdateItemButton handleClick={saveItem} type="cancel" />
          </Fragment>
        ) : (
          <Fragment>
            <UpdateItemButton handleClick={editItem} type="edit" />
            <UpdateItemButton handleClick={removeItem} type="remove" />
          </Fragment>
        )}
      </ButtonsContainer>
    </StyledItem>
  );
};

export default EntityItemAdmin;
