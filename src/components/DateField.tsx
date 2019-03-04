import 'date-fns';
import React from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { mainColor } from './../constants';

interface Props {
  entity: string;
  id: string;
  label: string;
  type: string;
  value?: Date | string;
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

const DateField = ({ label, value, handleChange }: Props) => (
  <MuiThemeProvider theme={muiTheme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledPicker
        variant="outlined"
        margin="normal"
        label={label}
        value={value}
        minDate={new Date()}
        onChange={(date: Date) => {
          handleChange(date);
        }}
        classes={{
          root: 'root'
        }}
      />
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>
);

export default DateField;
