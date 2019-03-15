import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import api from '../../ApiService';
import actions from '../../redux/actions';
import AdminFormContainer from './AdminFormContainer';
import AddRows from './sections/AddRows';
import TextField from '../fields/TextField/TextField';
import SelectField from '../fields/SelectField/SelectField';
import SubmitButton from '../buttons/SubmitButton';

const AddHallForm = ({ /*loadAllCinemas,*/ handleSnackbar }: any) => {
  const [cinemaOptions, setCinemaOptions] = useState(null);
  const [title, setTitle] = useState('');
  const [cinema, setCinema] = useState('');
  const [rows, setRows]: [any, any] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (title && cinema && !!rows.length) {
      setButtonDisabled(false);
    }
    if (!cinemaOptions) {
      loadAllCinemas();
    }
  }, [title, cinema, rows]);

  const loadAllCinemas = async () => {
    try {
      const data: any = await api.loadAllCinemas();
      if (data) {
        const customizedOptions = data.map((cinema: any) => ({
          label: cinema.name,
          value: cinema.id
        }));
        setCinemaOptions(customizedOptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = await api.createHall({ title, cinema, rows });
    if (result) {
      setTitle('');
      setCinema('');
      setRows([]);
      setButtonDisabled(true);
      handleSnackbar('New hall added', 'success');
    }
  };

  const handleRowsChange = (newRow: any) => setRows([...rows, newRow]);

  return (
    <AdminFormContainer title="Add Hall">
      <form style={{ maxWidth: '550px' }} onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Hall Title"
          value={title}
          handleChange={(e: any) => setTitle(e.target.value)}
          withoutSuggestions={true}
        />
        <SelectField
          id="cinema"
          type="select"
          options={cinemaOptions}
          // entity="cinema"
          label="Choose Cinema"
          value={cinema}
          handleChange={(value: any) => setCinema(value)}
        />
        <AddRows handleSubmit={handleRowsChange} prevRows={rows} />
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
)(AddHallForm);
