import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import Hall from '../../../classes/Hall';

import { Option } from '../../../helpers/loadSelectOptions';
import { loadAllCinemaOptions } from '../../../helpers/loadSelectOptions';
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
  const [cinema, setCinema] = useState('');
  const [rows, setRows]: [any, any] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (title && cinema && !!rows.length) {
      setButtonDisabled(false);
    }
    if (!cinemaOptions) {
      loadAllCinemaOptions(setCinemaOptions);
    }
  }, [title, cinema, rows]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    /*     const result = await api.createHall({ title, cinema, rows });
    if (result) {
      setTitle('');
      setCinema('');
      setRows([]);
      setButtonDisabled(true);
      handleSnackbar('New hall added', 'success');
    } */
  };

  const handleUpdate = () => {};

  const handleRemove = () => {};

  const handleRowsChange = (newRow: {
    category: string;
    quantity: string;
  }): void => setRows([...rows, newRow]);

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
          value={cinema}
          handleChange={(value: string) => setCinema(value)}
        />
        <NewRowController handleSubmit={handleRowsChange} prevRows={rows} />
        <SubmitButton
          text="Add Hall"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </form>
      {hallList &&
        !!hallList.length &&
        hallList.map((item: Hall) => (
          <AdminListItem
            key={item.id.toString()}
            item={item}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
            handleSnackbar={handleSnackbar}
          />
        ))}
    </AdminFormContainer>
  );
};

export default HallSection;
