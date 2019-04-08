import React, { Fragment, useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import Hall from '../../../classes/Hall';
import { RowItem } from '../elements/NewRowController';

import hallService from '../../../services/Hall';

import {
  loadAllCinemaOptions,
  Option
} from '../../../helpers/loadSelectOptions';
import parseFieldsFromEntity from '../../../helpers/parseFieldsFromEntity';
import AdminFormContainer from '../AdminFormContainer';
import NewRowController from '../elements/NewRowController';
import TextField from '../../fields/TextField/TextField';
import SelectField from '../../fields/SelectField/SelectField';
import SubmitButton from '../../buttons/SubmitButton';
import AdminListItem from '../elements/AdminListItem';

const HallSection = ({ handleSnackbar }: any) => {
  const [hallList, setHallList] = useState<Hall[] | null>(null);
  const [cinemaOptions, setCinemaOptions] = useState<Option[] | null>(null);
  const [title, setTitle] = useState('');
  const [cinemaID, setCinemaID] = useState('');
  const [rows, setRows] = useState<RowItem[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (title && cinemaID && !!rows.length) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    if (!cinemaOptions) {
      loadAllCinemaOptions(setCinemaOptions);
    }
    if (!hallList) {
      hallService.getAll(setHallList);
    }
  }, [title, cinemaID, rows]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await hallService.create({ title, cinemaID, rows });
    if (result) {
      setTitle('');
      setCinemaID('');
      setRows([]);
      setButtonDisabled(true);
      handleSnackbar('New hall added', 'success');
      hallService.getAll(setHallList);
    }
  };

  const handleUpdate = () => {
    console.log('update hall');
  };

  const handleRemove = () => {
    console.log('remove hall');
  };

  return (
    <AdminFormContainer title="Add Hall">
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Hall Title"
          value={title}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setTitle(e.target.value)
          }
        />
        <SelectField
          id="cinema"
          type="select"
          options={cinemaOptions}
          label="Choose Cinema"
          value={cinemaID}
          handleChange={(value: string) => setCinemaID(value)}
        />
        <NewRowController
          prevRows={rows}
          handleSnackbar={handleSnackbar}
          rowsSetter={setRows}
        />
        <SubmitButton
          text="Add Hall"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </form>
      {hallList && !!hallList.length && (
        <Fragment>
          <h3>Hall List</h3>
          {hallList.map((item: Hall) => (
            <AdminListItem
              properties={parseFieldsFromEntity(item as any)}
              id={item.id}
              key={item.id.toString()}
              handleUpdate={handleUpdate}
              handleRemove={handleRemove}
              handleSnackbar={handleSnackbar}
            />
          ))}
        </Fragment>
      )}
    </AdminFormContainer>
  );
};

export default HallSection;
