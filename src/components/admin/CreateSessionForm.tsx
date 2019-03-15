import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import AddIcon from '@material-ui/icons/Add';

import actions from '../../redux/actions';
import AdminFormContainer from './AdminFormContainer';
import TextField from '../fields/TextField/TextField';
import SelectField from '../fields/SelectField/SelectField';
// import SubmitButton from '../buttons/SubmitButton';

const CreateSessionForm = ({ loadAllCinemas, handleSnackbar }: any) => {
  const [cinemasLoaded, setCinemasLoaded] = useState(false);
  const [cinema, setCinema] = useState('');
  const [hallOptions, setHallOptions] = useState([]);
  const [hall, setHall] = useState('');

  useEffect(() => {
    if (!cinemasLoaded) {
      loadAllCinemas();
      setCinemasLoaded(true);
    }
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <AdminFormContainer title="Create Session">
      <form onSubmit={handleSubmit}>
        <SelectField
          id="cinema"
          type="select"
          // entity="cinema"
          label="Choose Cinema"
          value={cinema}
          handleChange={(value: any) => setCinema(value)}
        />
        <SelectField
          id="hall"
          type="select"
          // entity="hall"
          label="Choose Hall"
          value={hall}
          options={hallOptions}
          handleChange={(value: any) => setHall(value)}
        />
      </form>
    </AdminFormContainer>
  );
};

export default connect(
  null,
  actions
)(CreateSessionForm);
