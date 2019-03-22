import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import api from '../../ApiService';
import { loadAllCinemaOptions } from '../../helpers/loadSelectOptions';
import AdminFormContainer from './AdminFormContainer';
import TextField from '../fields/TextField/TextField';
import SelectField from '../fields/SelectField/SelectField';
import SubmitButton from '../buttons/SubmitButton';

const AddServicesForm = ({ handleSnackbar }: any) => {
  const [cinemaOptions, setCinemaOptions] = useState(false);
  const [cinema, setCinema] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (title && cinema && !!price) {
      setButtonDisabled(false);
    }
    if (!cinemaOptions) {
      loadAllCinemaOptions(setCinemaOptions);
    }
  }, [title, cinema, price]);

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await api.createService({ title, cinema, price });
    if (result) {
      setTitle('');
      setCinema('');
      setPrice('');
      setButtonDisabled(true);
      handleSnackbar('New service added', 'success');
    }
  };

  return (
    <AdminFormContainer title="Add Services">
      <form onSubmit={handleSubmit}>
        <SelectField
          id="cinema"
          type="select"
          options={cinemaOptions}
          label="Choose Cinema"
          value={cinema}
          handleChange={(value: string) => setCinema(value)}
        />
        <TextField
          name="title"
          label="Service title"
          value={title}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setTitle(e.target.value)
          }
        />
        <TextField
          name="price"
          label="Service price"
          type="number"
          value={price}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setPrice(e.target.value)
          }
        />
        <SubmitButton
          text="Add Hall"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </form>
    </AdminFormContainer>
  );
};

export default AddServicesForm;
