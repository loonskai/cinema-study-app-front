import 'date-fns';
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

const StyledPicker = styled(DatePicker)`
  && {
    width: 100%;
  }
`;

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#009688',
      light: '#009688',
      dark: '#009688'
    },
    secondary: {
      main: '#009688'
    }
  }
});

const DateField = props => {
  const handleDateChange = date => {
    props.handleChange(date);
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <StyledPicker
          variant="outlined"
          margin="normal"
          label={props.label}
          value={props.value}
          minDate={new Date()}
          onChange={handleDateChange}
          classes={{
            root: 'root'
          }}
        />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default DateField;
