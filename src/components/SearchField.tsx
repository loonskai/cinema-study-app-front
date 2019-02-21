import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import LocalMovies from '@material-ui/icons/LocalMovies';
import LocationCity from '@material-ui/icons/LocationCity';
import Weekend from '@material-ui/icons/Weekend';
import TextField from './TextField';
import SelectField from './SelectField';

const IconStyled = styled(({ icon, ...other }) => {
  switch (icon) {
    case 'movie':
      return (
        <LocalMovies fontSize="large" classes={{ root: 'root' }} {...other} />
      );
    case 'city':
      return (
        <LocationCity fontSize="large" classes={{ root: 'root' }} {...other} />
      );
    case 'cinema':
      return <Weekend fontSize="large" classes={{ root: 'root' }} {...other} />;
    default:
      return null;
  }
})`
  &.root {
    color: #009688;
  }
`;

interface FieldProps {
  type: 'text' | 'select';
  label: string;
}

interface Props extends FieldProps {
  icon?: string;
}

const getField = ({ type, label }: FieldProps) => {
  switch (type) {
    case 'text':
      return <TextField label={label} />;
    case 'select':
      return <SelectField label={label} />;
    default:
      return null;
  }
};

const SearchField = ({ type, label, icon }: Props) => {
  return (
    <Grid container={true} spacing={8} justify="center" alignItems="center">
      <Grid item={true}>
        <IconStyled icon={icon} />
      </Grid>
      <Grid item={true} lg={7}>
        {getField({ type, label })}
      </Grid>
    </Grid>
  );
};

export default SearchField;
