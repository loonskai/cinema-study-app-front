import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import AdminFormContainer from './AdminFormContainer';
import TextField from '../fields/TextField/TextField';
import SubmitButton from '../buttons/SubmitButton';

const AddHallForm = () => {
  const [values, setValues] = useState({
    title: '',
    cinemaId: null,
    seats: []
  });

  return (
    <AdminFormContainer title="Add Hall">
      <div>form</div>
    </AdminFormContainer>
  );
};

export default AddHallForm;
