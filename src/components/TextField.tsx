import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

interface Props {
  label: string;
}

const InputStyled = styled(({ ...other }) => <TextField {...other} />)`
  .cssLabel.cssFocused {
    color: #009688;
  }
  .cssOutlinedInput.cssFocused .notchedOutline {
    border-color: #009688;
  }
`;

const TextFieldStyled = ({ label }: Props) => {
  return (
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
  );
};

export default TextFieldStyled;
