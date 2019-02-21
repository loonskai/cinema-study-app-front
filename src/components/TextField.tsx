import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocalMovies from '@material-ui/icons/LocalMovies';
import LocationCity from '@material-ui/icons/LocationCity';
import { getConfirmation } from 'history/DOMUtils';

interface Props {
  label: string;
  icon?: string;
}

const TextFieldStyled = ({ label, icon }: Props) => {
  const getInputIcon = () => {
    if (!icon) return null;
    switch (icon) {
      case 'movie':
        return <LocalMovies fontSize="large" />;
      case 'city':
        return <LocationCity fontSize="large" />;
      default:
        return null;
    }
  };

  return (
    <Grid container spacing={8} justify="center" alignItems="center">
      <Grid item>{getInputIcon()}</Grid>
      <Grid item lg={7}>
        <TextField
          id="outlined-search"
          label={label}
          type="search"
          margin="normal"
          variant="outlined"
          fullWidth={true}
        />
      </Grid>
    </Grid>
  );
};

export default TextFieldStyled;
