import 'date-fns';
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import { mainColor, mainDarkColor } from './../constants';

interface Props {
  entity: string;
  id: string;
  label: string;
  type: string;
  value: Date | string;
  handleChange: (param: any) => any;
}

const StyledPicker = styled(DatePicker)<any>`
  && {
    width: 100%;
  }
`;

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: mainColor,
      light: mainColor,
      dark: mainColor
    },
    secondary: {
      main: mainColor
    }
  },
  typography: {
    useNextVariants: true
  }
});

const DateField = (props: Props) => {
  const handleDateChange = (date: Date) => {
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
