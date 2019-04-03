import React, { Fragment, useState, useEffect } from 'react';
import uuid from 'uuid';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';

import parseFieldsFromEntity from '../../../helpers/parseFieldsFromEntity';
import {
  loadRowCategoryOptions,
  Option
} from '../../../helpers/loadSelectOptions';
import { AdminListItemType } from '../../../helpers/parseFieldsFromEntity';
import TextField from '../../fields/TextField/TextField';
import SelectField from '../../fields/SelectField/SelectField';
import RoundButton from '../../buttons/RoundButton';
import AdminListItem from '../elements/AdminListItem';
import { mainColor, mainDarkColor } from '../../../constants';

export interface RowItem {
  id: string;
  quantity: string;
  category: string;
  lastInSection: boolean;
}

export interface RowViewItem {
  id: string;
  quantity: string;
  category: string;
  lastInSection: string;
}

interface Props {
  handleSnackbar: (message: string, status: string) => void;
  rowsSetter: (rows: RowItem[]) => void;
  prevRows: RowItem[];
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 0;
`;

const Title = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Row = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RowElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 0 0.3rem;
  text-align: center;
  & .checkbox-checked {
    color: ${mainDarkColor} !important;
  }
`;

const NewRowController = ({ prevRows, rowsSetter, handleSnackbar }: Props) => {
  const [newRow, setNewRowValue] = useState<RowItem>({
    id: uuid(),
    quantity: '20',
    category: '3',
    lastInSection: false
  });
  const [categoryOptions, setCategoryOptions] = useState<Option[] | null>(null);

  useEffect(() => {
    if (!categoryOptions) {
      loadRowCategoryOptions(setCategoryOptions);
    }
  }, [prevRows, categoryOptions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewRowValue({
      ...newRow,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = () => {
    rowsSetter([...prevRows, newRow]);
    setNewRowValue({
      id: uuid(),
      quantity: '',
      category: '',
      lastInSection: false
    });
  };

  const handleUpdate = async (
    id: string,
    inputValues: RowViewItem
  ): Promise<RowViewItem> => {
    const rowUpdated: RowItem = {
      id,
      ...inputValues,
      lastInSection: inputValues.lastInSection === 'Yes'
    };
    const updatedRows: RowItem[] = prevRows.map(row =>
      row.id === id ? rowUpdated : row
    );
    rowsSetter(updatedRows);
    return {
      ...rowUpdated,
      lastInSection: rowUpdated.lastInSection ? 'Yes' : 'No'
    };
  };

  const handleRemove = (id: string) => {
    const updatedRows: RowItem[] = prevRows.filter(row => row.id !== id);
    rowsSetter(updatedRows);
    return true;
  };

  const getProperties = (item: any): AdminListItemType[] => {
    return parseFieldsFromEntity(item).map((field: AdminListItemType) => {
      const option =
        categoryOptions &&
        categoryOptions.find((opt: Option) => opt.value === field.value);
      return field.type === 'select'
        ? {
            ...field,
            value: option && option.value,
            options: categoryOptions
          }
        : field;
    }) as AdminListItemType[];
  };

  return (
    <Container>
      <Title>Add seat rows</Title>
      <Row>
        <RowElement>
          <SelectField
            id="category"
            type="select"
            options={categoryOptions}
            label="Row Category"
            value={newRow.category}
            handleChange={(value: string) =>
              setNewRowValue({ ...newRow, category: value })
            }
          />
        </RowElement>
        <RowElement>
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={newRow.quantity.toString()}
            handleChange={handleChange}
          />
        </RowElement>
        <RowElement>
          <FormControlLabel
            control={
              <Checkbox
                checked={newRow.lastInSection}
                onChange={() =>
                  setNewRowValue((prevNewRowValues: RowItem) => ({
                    ...newRow,
                    lastInSection: !prevNewRowValues.lastInSection
                  }))
                }
                classes={{ checked: 'checkbox-checked' }}
              />
            }
            label="Last in section"
          />
        </RowElement>
        <RowElement>
          <RoundButton
            icon={<AddIcon />}
            bgColor={mainColor}
            handleClick={handleAdd}
            disabled={!newRow.category || !newRow.quantity}
          />
        </RowElement>
      </Row>
      {!!prevRows.length && (
        <Fragment>
          {prevRows.map((row: RowItem) => {
            const item: RowViewItem = {
              ...row,
              lastInSection: row.lastInSection ? 'Yes' : 'No'
            };
            return (
              <AdminListItem
                // item={item}
                key={row.id}
                id={row.id}
                properties={getProperties(item)}
                handleUpdate={handleUpdate}
                handleRemove={handleRemove}
                handleSnackbar={handleSnackbar}
              />
            );
          })}
        </Fragment>
      )}
    </Container>
  );
};

export default NewRowController;
