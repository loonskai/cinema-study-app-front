import 'date-fns';
import * as React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

const DateField = props => {
  const handleDateChange = date => {
    props.handleChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        margin="normal"
        label="Date picker"
        value={props.value}
        minDate={props.value}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
