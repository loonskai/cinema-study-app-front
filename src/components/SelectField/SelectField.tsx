import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as StyledContainers from './styled';
import { cinemas } from './../../mocks';

interface Props {
  entity: string;
  id: string;
  label: string;
  type: string;
  value?: string | Date;
  handleChange: (param: string) => string;
}

const getOptions = (entity: string) => {
  let options;
  switch (entity) {
    case 'cinema': {
      options = cinemas as Array<{ label: string }>;
      break;
    }
    default: {
      options = [] as Array<{ label: string }>;
      break;
    }
  }
  return options.map((option, index) => (
    <MenuItem key={index.toString()} value={option.label}>
      {option.label}
    </MenuItem>
  ));
};

const SelectField = ({ label, value, handleChange, entity }: Props) => (
  <StyledContainers.FormControlStyled
    margin="normal"
    fullWidth={true}
    variant="outlined"
  >
    <StyledContainers.InputLabelStyled
      ref={(ref: React.RefObject<HTMLInputElement>) => {
        this.InputLabelRef = ref;
      }}
      htmlFor="outlined-age-simple"
      classes={{
        focused: 'focused'
      }}
    >
      {label}
    </StyledContainers.InputLabelStyled>
    <Select
      value={value}
      onChange={(e: any) => {
        handleChange(e.target.value);
      }}
      input={
        <StyledContainers.OutlinedInputStyled
          labelWidth={115}
          name="age"
          id="outlined-age-simple"
          fullWidth={true}
          classes={{
            focused: 'outlined'
          }}
        />
      }
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {getOptions(entity)}
    </Select>
  </StyledContainers.FormControlStyled>
);

export default SelectField;
