import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import Cinema from '../../../classes/Cinema';

import parseFieldsFromEntity from '../../../helpers/parseFieldsFromEntity';
import cinemaService from '../../../services/Cinema';
import AdminFormContainer from '../AdminFormContainer';
import TextField from '../../fields/TextField/TextField';
import SubmitButton from '../../buttons/SubmitButton';
import AdminListItem from '../elements/AdminListItem';

interface InputErrors {
  title: string | null;
  city: string | null;
}

interface InputValues {
  title: string;
  city: string;
}

const CinemaSection = ({ handleSnackbar }: any) => {
  const [cinemaList, setCinemaList] = useState<Cinema[] | null>(null);
  const [values, setValues] = useState<InputValues>({ title: '', city: '' });
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

  const handleUpdate = async (id: number, inputValues: any): Promise<any> => {
    const result = await cinemaService.update(id, inputValues);
    if (result.error) {
      handleSnackbar('Unable to update cinema', 'error');
    } else {
      handleSnackbar('Succesfully updated', 'success');
      await cinemaService.getAll(setCinemaList);
      return result.data;
    }
  };

  const handleRemove = async (id: number) => {
    const result = await cinemaService.delete(id);
    if (!result) {
      handleSnackbar('Unable to delete cinema', 'error');
    } else {
      handleSnackbar('Cinema deleted', 'warning');
      await cinemaService.getAll(setCinemaList);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await cinemaService.create(values, setInputErrors);
    if (result.success) {
      setValues({ city: '', title: '' });
      setInputErrors({ city: '', title: '' });
      setButtonDisabled(true);
      handleSnackbar(result.data, 'success');
      await cinemaService.getAll(setCinemaList);
    }
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
      {cinemaList &&
        !!cinemaList.length &&
        cinemaList.map((item: Cinema) => (
          <AdminListItem
            key={item.id.toString()}
            id={item.id}
            properties={parseFieldsFromEntity(item)}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
            handleSnackbar={handleSnackbar}
          />
        ))}
    </AdminFormContainer>
  );
};

export default CinemaSection;
