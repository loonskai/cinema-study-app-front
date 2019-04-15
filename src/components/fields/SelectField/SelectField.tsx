import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as StyledContainers from './styled';

interface Props {
  id: string;
  label: string;
  type: string;
  value?: string | Date;
  options?: any;
  disabled?: boolean;
  handleChange: any;
}

const SelectField = ({
  label,
  value,
  handleChange,
  options,
  disabled
}: Props) => {
  const renderOptions = () =>
    options.map((option: any, index: number) => (
      <MenuItem key={index.toString()} value={option.value}>
        {option.label}
      </MenuItem>
    ));

  return (
    <StyledContainers.FormControlStyled
      margin="normal"
      fullWidth={true}
      variant="outlined"
      disabled={disabled}
    >
      <StyledContainers.InputLabelStyled
        ref={(ref: React.RefObject<HTMLInputElement>): void => {
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
        onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => {
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
        {options && renderOptions()}
      </Select>
    </StyledContainers.FormControlStyled>
  );
};

export default connect(({ cinemas }: any) => ({ cinemas }))(SelectField);
