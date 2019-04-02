import React, { Fragment, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

import { AdminListItemType } from '../../../helpers/parseFieldsFromEntity';
import UpdateItemButton from '../../buttons/UpdateItemButton';
import { mainColor } from '../../../constants';

interface Props {
  item: any;
  handleSnackbar: (message: string, status: string) => void;
  handleUpdate: (id: number | string, values: any) => any;
  handleRemove: (id: number | string) => void;
  properties: AdminListItemType[];
  id: string | number;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const ItemsContainer = styled.div`
  flex: 1;
`;

const ItemColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 0.2rem;
  padding-top: 0.5rem;

  & .input-focused {
    color: ${mainColor} !important;
  }

  & .input-underline::after {
    border-bottom-color: ${mainColor};
  }

  & strong {
    width: 100%;
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.54);
  }
  & span {
    width: 100%;
    padding: 0.5rem 0;
    font-size: 1rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-self: flex-end;
  justify-content: center;
  align-items: center;
`;

const AdminListItem = ({
  // item,
  id,
  handleUpdate,
  handleRemove,
  properties
}: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [itemValues, setItemValues] = useState<{ [key: string]: any } | null>(
    null
  );
  const [inputValues, setInputValues] = useState<{ [key: string]: any } | null>(
    null
  );

  useEffect(() => {
    const initValues = properties.reduce(
      (obj, property) => {
        obj[property.name as string] = property.value;
        return obj;
      },
      {} as any
    );
    setItemValues(initValues);
    setInputValues(initValues);
  }, [properties]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const renderProperties = (property: AdminListItemType) => {
    if (editMode) {
      switch (property.type) {
        case 'checkbox':
        case 'text':
          return (
            <TextField
              label={property.label}
              name={property.name}
              value={inputValues && inputValues[property.name]}
              onChange={handleChange}
              margin="none"
              InputLabelProps={{
                classes: { focused: 'input-focused' }
              }}
              InputProps={{
                classes: { underline: 'input-underline' }
              }}
            />
          );

        case 'number':
        case 'select':
        default:
          return null;
      }
    }
    return (
      <Fragment>
        <strong>{property.label}</strong>
        <span>{property.value}</span>
      </Fragment>
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
    const result = await handleUpdate(id, inputValues);
    if (result) {
      setItemValues(result);
      setEditMode(false);
    }
  };

  const removeItem = () => handleRemove(id);

  return (
    <Container>
      <ItemsContainer>
        {properties.map((property, index) => (
          <ItemColumn key={index.toString()}>
            {renderProperties(property)}
          </ItemColumn>
        ))}
      </ItemsContainer>
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
    </Container>
  );
};

export default AdminListItem;
