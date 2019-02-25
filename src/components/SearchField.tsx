import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import LocalMovies from '@material-ui/icons/LocalMovies';
import LocationCity from '@material-ui/icons/LocationCity';
import Weekend from '@material-ui/icons/Weekend';
import styled from 'styled-components';

import TextField from './TextField/TextField';
import SelectField from './SelectField';

const IconStyled = styled(({ entity, ...other }) => {
  switch (entity) {
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

const getField = props => {
  switch (props.type) {
    case 'text':
      return <TextField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    default:
      return null;
  }
};

const SearchField = props => {
  return (
    <Grid container={true} spacing={8} justify="center" alignItems="center">
      <Grid item={true}>
        <IconStyled entity={props.entity} />
      </Grid>
      <Grid item={true} lg={7}>
        {getField(props)}
      </Grid>
    </Grid>
  );
};

export default SearchField;
