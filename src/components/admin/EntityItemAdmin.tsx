import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import UpdateItemButton from '../buttons/UpdateItemButton';
import { greyColor } from '../../constants';

interface Props {
  item: any;
  handleSnackbar: (message: string, status: string) => void;
  handleRemove: (id: number) => void;
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

const EntityItemAdmin = ({ item, handleSnackbar, handleRemove }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemValues, setItemValues] = useState(item);
  const [inputValues, setInputValues] = useState(item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const renderProperties = (item: any) => {
    const keys = Object.keys(item);
    return keys.map(
      (key: string, index: number) =>
        key !== 'id' && (
          <ItemColumn key={index.toString()}>
            <strong>{key}</strong>:{' '}
            {editMode ? (
              <input
                type="text"
                name={key}
                value={inputValues[key]}
                onChange={handleChange}
              />
            ) : (
              <span>{itemValues[key]}</span>
            )}
          </ItemColumn>
        )
    );
  };

  const editItem = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    setInputValues(itemValues);
    setEditMode(false);
  };

  const saveItem = async () => {
    // Move logic to parent component
    const result = await item.update(inputValues);
    if (result.error) {
      handleSnackbar(result.message, 'error');
    } else {
      setItemValues(result);
      setEditMode(false);
      handleSnackbar('Succesfully updated', 'success');
    }
  };

  const removeItem = () => handleRemove(item.id);

  return (
    <StyledItem>
      <ItemsContainer>{renderProperties(item)}</ItemsContainer>
      <ButtonsContainer>
        {editMode ? (
          <Fragment>
            <UpdateItemButton handleClick={saveItem} type="save" />
            <UpdateItemButton handleClick={cancelEdit} type="cancel" />
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
