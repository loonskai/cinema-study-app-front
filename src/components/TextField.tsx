import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocalMovies from '@material-ui/icons/LocalMovies';
import LocationCity from '@material-ui/icons/LocationCity';
import styled from 'styled-components';

interface Props {
  label: string;
  icon?: string;
}

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
    default:
      return null;
  }
})`
  &.root {
    color: #009688;
  }
`;

const InputStyled = styled(({ ...other }) => <TextField {...other} />)`
  .cssLabel.cssFocused {
    color: #009688;
  }
  .cssOutlinedInput.cssFocused .notchedOutline {
    border-color: #009688;
  }
`;

const TextFieldStyled = ({ label, icon }: Props) => {
  return (
    <Grid container={true} spacing={8} justify="center" alignItems="center">
      <Grid item={true}>
        <IconStyled icon={icon} />
      </Grid>
      <Grid item={true} lg={7}>
        <InputStyled
          id="outlined-search"
          label={label}
          type="search"
          margin="normal"
          variant="outlined"
          fullWidth={true}
          InputLabelProps={{
            classes: {
              root: 'cssLabel',
              focused: 'cssFocused'
            }
          }}
          InputProps={{
            classes: {
              root: 'cssOutlinedInput',
              focused: 'cssFocused',
              notchedOutline: 'notchedOutline'
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default TextFieldStyled;
