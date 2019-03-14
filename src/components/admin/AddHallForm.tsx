import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import AdminFormContainer from './AdminFormContainer';
import TextField from '../fields/TextField/TextField';
import SelectField from '../fields/SelectField/SelectField';
import SubmitButton from '../buttons/SubmitButton';
import actions from '../../redux/actions';

const AddHallForm = ({ loadAllCinemas }: any) => {
  const [values, setValues] = useState({
    title: '',
    cinema: '',
    seats: []
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (values.title && values.cinema && values.seats.length) {
      setButtonDisabled(false);
    }
    loadAllCinemas();
  }, []);

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit add hall', values);
  };

  return (
    <AdminFormContainer title="Add Hall">
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Hall Title"
          value={values.title}
          handleChange={handleChange}
          withoutSuggestions={true}
        />
        <SelectField
          id="cinema"
          type="select"
          entity="cinema"
          label="Choose Cinema"
          value={values.cinema}
          handleChange={(value: any) => {
            setValues({
              ...values,
              cinema: value
            });
          }}
        />
        <SubmitButton
          text="Add Cinema"
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
