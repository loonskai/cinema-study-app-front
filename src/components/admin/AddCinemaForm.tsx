import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import Cinema from '../../classes/Cinema';

import cinemaService from '../../services/Cinema';
import AdminFormContainer from './AdminFormContainer';
import TextField from '../fields/TextField/TextField';
import SubmitButton from '../buttons/SubmitButton';
import EntityItemAdmin from './EntityItemAdmin';

interface InputErrors {
  title: string | null;
  city: string | null;
}

interface InputValues {
  title: string;
  city: string;
}

const AddCinemaForm = ({ handleSnackbar }: any) => {
  const [cinemaList, setCinemaList] = useState<Cinema[] | null>(null);
  const [values, setValues] = useState({
    title: '',
    city: ''
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    title: null,
    city: null
  });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (values.city && values.title) {
      setButtonDisabled(false);
    }

    if (!cinemaList) {
      cinemaService.getAll(setCinemaList);
    }
  }, [values, cinemaList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await cinemaService.create(values, setInputErrors);
    if (result.success) {
      setValues({
        city: '',
        title: ''
      });
      setInputErrors({
        city: '',
        title: ''
      });
      setButtonDisabled(true);
      handleSnackbar(result.data, 'success');
      await cinemaService.getAll(setCinemaList);
    }
  };

  const renderItems = (list: any) => {
    return list.map((item: any) => (
      <EntityItemAdmin
        key={item.id.toString()}
        item={item}
        handleSnackbar={handleSnackbar}
      />
    ));
  };

  return (
    <AdminFormContainer title="Add Cinema">
      <form onSubmit={handleSubmit}>
        <TextField
          name="city"
          label={inputErrors.city || 'City'}
          error={!!inputErrors.city}
          value={values.city}
          handleChange={handleChange}
        />
        <TextField
          name="title"
          label={inputErrors.title || 'Cinema Title'}
          error={!!inputErrors.title}
          value={values.title}
          handleChange={handleChange}
        />
        <SubmitButton
          text="Add Cinema"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </form>
      {cinemaList && cinemaList.length && renderItems(cinemaList)}
    </AdminFormContainer>
  );
};

export default AddCinemaForm;
