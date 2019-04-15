import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import Bonus from '../../../classes/Bonus';
import bonusService from '../../../services/Bonus';
import {
  loadAllCinemaOptions,
  Option
} from '../../../helpers/loadSelectOptions';
import parseFieldsFromEntity from '../../../helpers/parseFieldsFromEntity';

import AdminFormContainer from '../AdminFormContainer';
import AdminListItem from '../elements/AdminListItem';
import SelectField from '../../fields/SelectField/SelectField';
import TextField from '../../fields/TextField/TextField';
import SubmitButton from '../../buttons/SubmitButton';

const BonusSection = ({ handleSnackbar }: any) => {
  const [bonusList, setBonusList] = useState<Bonus[] | null>(null);
  const [cinemaOptions, setCinemaOptions] = useState<Option[] | null>(null);
  const [cinemaID, setCinema] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (title && cinemaID && !!price) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    if (!cinemaOptions) {
      loadAllCinemaOptions(setCinemaOptions);
    }
    if (!bonusList) {
      bonusService.getAll({}, setBonusList);
    }
  }, [title, cinemaID, price, bonusList]);

  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await bonusService.create({
      title,
      cinemaID,
      price: +price
    });
    if (result) {
      setTitle('');
      setCinema('');
      setPrice('');
      setButtonDisabled(true);
      handleSnackbar('New service added', 'success');
      await bonusService.getAll({}, setBonusList);
    }
  };

  const handleUpdate = async (id: number, inputValues: any): Promise<any> => {
    const result = await bonusService.update(id, inputValues);
    if (result.error) {
      handleSnackbar('Unable to update bonus', 'error');
    } else {
      handleSnackbar('Succesfully updated', 'success');
      await bonusService.getAll({}, setBonusList);
      return result.data;
    }
  };

  const handleRemove = async (id: number) => {
    const result = await bonusService.delete(id);
    if (!result) {
      handleSnackbar('Unable to delete bonus', 'error');
    } else {
      handleSnackbar('Bonus deleted', 'warning');
      await bonusService.getAll({}, setBonusList);
    }
  };

  return (
    <AdminFormContainer title="Add Bonus">
      <form onSubmit={handleSubmit}>
        <SelectField
          id="cinema"
          type="select"
          options={cinemaOptions}
          label="Choose Cinema"
          value={cinemaID}
          handleChange={(value: string) => setCinema(value)}
        />
        <TextField
          name="title"
          label="Bonus title"
          value={title}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setTitle(e.target.value)
          }
        />
        <TextField
          name="price"
          label="Bonus price"
          type="number"
          value={price}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setPrice(e.target.value)
          }
        />
        <SubmitButton
          text="Add Bonus"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </form>
      {bonusList &&
        bonusList.map(item => (
          <AdminListItem
            properties={parseFieldsFromEntity(item as any)}
            id={item.id}
            key={item.id.toString()}
            handleUpdate={handleUpdate}
            handleRemove={handleRemove}
            handleSnackbar={handleSnackbar}
          />
        ))}
    </AdminFormContainer>
  );
};

export default BonusSection;
