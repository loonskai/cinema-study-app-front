import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

export const Input = styled(({ ...other }) => <TextField {...other} />)`
  .cssLabel.cssFocused {
    color: #009688;
  }
  .cssOutlinedInput.cssFocused .notchedOutline {
    border-color: #009688;
  }
`;

export const Autosuggest = styled.div`
  && .container {
    position: relative;
  }
`;

export const PaperStyled = styled(Paper)`
  &&.suggestions-container-open {
    position: absolute;
    max-height: 250px;
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
