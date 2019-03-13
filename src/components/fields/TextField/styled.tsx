import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { mainColor, whiteColor } from '../../../constants';

export const Input = styled(initialProps => {
  /* We can expand InputProps with inputRef if necessary (i.e. for react-autosuggest renderInputComponent method) */
  const InputProps = {
    classes: {
      root: 'cssOutlinedInput',
      focused: !initialProps.error && 'cssFocused',
      notchedOutline: 'notchedOutline'
    },
    ...initialProps.InputProps
  };
  return (
    <TextField
      fullWidth={true}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        classes: {
          root: 'cssLabel',
          focused: !initialProps.error && 'cssFocused',
          outlined: 'label-outlined'
        }
      }}
      {...initialProps}
      InputProps={InputProps}
    />
  );
})`
  && .cssLabel.cssFocused.label-outlined {
    color: ${mainColor};
  }
  && .cssOutlinedInput.cssFocused .notchedOutline {
    border-color: ${mainColor};
  }

  && .label-outlined {
    padding: 0 0.5rem;
    background-color: ${whiteColor};
  }
`;

export const Autosuggest = styled.div`
  && .container {
    position: relative;
  }
`;

export const PaperStyled = styled(Paper)<any>`
  &&.suggestions-container-open {
    position: absolute;
    max-height: 15.625rem;
    overflow-y: scroll;
    left: 0;
    right: 0;
    z-index: 200;
  }
  &&.suggestions-container-open .suggestions-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;
