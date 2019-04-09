import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import LocalMovies from '@material-ui/icons/LocalMovies';
import LocationCity from '@material-ui/icons/LocationCity';
import Weekend from '@material-ui/icons/Weekend';
import Search from '@material-ui/icons/Search';
import AccessTime from '@material-ui/icons/AccessTime';
import CalendarToday from '@material-ui/icons/CalendarToday';

import TextField from './TextField/TextField';
import SelectField from './SelectField/SelectField';
import DateField from './DateField';
import { mainDarkColor, greyColor } from '../../constants';

interface Props {
  options?: any;
  handleChange: (data: any) => any;
  handleSelect?: (data: any) => any;
  id: string;
  label: string;
  type: string;
  disabled?: boolean;
  value?: string | Date;
  icon?: string;
  initialSuggestions?: any;
}

const getField = (props: Props) => {
  switch (props.type) {
    case 'text':
      return <TextField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'date':
      return <DateField {...props} />;
    case 'time':
      return <SelectField {...props} />;
    default:
      return null;
  }
};

const gridColumnsNumber = 8;
const gridInputWidth = 7;

const FieldContainer = (props: Props) => {
  const IconStyled = styled(({ icon, ...other }) => {
    switch (icon) {
      case 'movie':
        return <LocalMovies fontSize="large" {...other} />;
      case 'city':
        return <LocationCity fontSize="large" {...other} />;
      case 'cinema':
      case 'hall':
        return <Weekend fontSize="large" {...other} />;
      case 'date':
        return <CalendarToday fontSize="large" {...other} />;
      case 'time':
        return <AccessTime fontSize="large" {...other} />;
      case 'search':
        return <Search fontSize="large" {...other} />;
      default:
        return null;
    }
  })`
    && {
      color: ${props.disabled ? greyColor : mainDarkColor};
    }
  `;

  return (
    <Grid
      container={true}
      spacing={gridColumnsNumber}
      justify="center"
      alignItems="center"
    >
      <Grid item={true}>
        <IconStyled icon={props.icon} />
      </Grid>
      <Grid item={true} lg={gridInputWidth}>
        {getField(props)}
      </Grid>
    </Grid>
  );
};

export default FieldContainer;
