import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import api from '../../ApiService';
import actions from '../../redux/actions';
import { loadAllCinemasOptions } from '../../helpers/loadSelectOptions';
import AdminFormContainer from './AdminFormContainer';
import TextField from '../fields/TextField/TextField';
import SelectField from '../fields/SelectField/SelectField';
import SubmitButton from '../buttons/SubmitButton';

const AddServicesForm = ({ loadAllCinemas, handleSnackbar }: any) => {
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
      loadAllCinemasOptions(setCinemaOptions);
    }
  }, [title, cinema, price]);

  const handleSubmit = async (e: any) => {
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
      <form style={{ maxWidth: '550px' }} onSubmit={handleSubmit}>
        <SelectField
          id="cinema"
          type="select"
          options={cinemaOptions}
          label="Choose Cinema"
          value={cinema}
          handleChange={(value: any) => setCinema(value)}
        />
        <TextField
          name="title"
          label="Service title"
          value={title}
          handleChange={(e: any) => setTitle(e.target.value)}
          withoutSuggestions={true}
        />
        <TextField
          name="price"
          label="Service price"
          type="number"
          value={price}
          handleChange={(e: any) => setPrice(e.target.value)}
          withoutSuggestions={true}
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

export default connect(
  null,
  actions
)(AddServicesForm);
