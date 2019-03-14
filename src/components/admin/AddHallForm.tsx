import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

import api from '../../ApiService';
import actions from '../../redux/actions';
import AdminFormContainer from './AdminFormContainer';
import AddSeats from './sections/AddSeats';
import TextField from '../fields/TextField/TextField';
import SelectField from '../fields/SelectField/SelectField';
import SubmitButton from '../buttons/SubmitButton';

const StyledForm = styled.form`
  max-width: 550px;
`;

const AddHallForm = ({ loadAllCinemas, handleSnackbar }: any) => {
  const [cinemasLoaded, setCinemasLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [cinema, setCinema] = useState('');
  const [rows, setRows]: [any, any] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (title && cinema && !!rows.length) {
      setButtonDisabled(false);
    }
    if (!cinemasLoaded) {
      loadAllCinemas();
      setCinemasLoaded(true);
    }
  }, [title, cinema, rows]);

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
      <StyledForm onSubmit={handleSubmit}>
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
          entity="cinema"
          label="Choose Cinema"
          value={cinema}
          handleChange={(value: any) => setCinema(value)}
        />
        <AddSeats handleSubmit={handleRowsChange} prevRows={rows} />
        <SubmitButton
          text="Add Cinema"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </StyledForm>
    </AdminFormContainer>
  );
};

export default connect(
  null,
  actions
)(AddHallForm);
