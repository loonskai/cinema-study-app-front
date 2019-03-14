import React from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as StyledContainers from './styled';
import { halls } from '../../../mocks';

interface Props {
  entity: string;
  id: string;
  label: string;
  type: string;
  value?: string | Date;
  disabled?: boolean;
  cinemas?: any;
  handleChange: any;
}

const SelectField = ({
  label,
  value,
  handleChange,
  entity,
  cinemas,
  disabled
}: Props) => {
  const getOptions = (entity: string) => {
    let options;
    switch (entity) {
      case 'cinema': {
        options = cinemas
          ? cinemas.map((cinema: any) => ({
              label: cinema.name,
              value: cinema.id
            }))
          : [];
        break;
      }
      case 'hall': {
        options = halls.map(hall => ({ label: hall.name, value: hall.id }));
        break;
      }
      case 'time': {
        options = [] as any;
        for (let i = 0; i <= 23; i++) {
          const label = i.toString().length > 1 ? `${i}:00` : `0${i}:00`;
          options.push({
            label,
            value: label
          });
        }
        break;
      }
      default: {
        options = [] as Array<{ label: string }>;
        break;
      }
    }
    return options.map((option: any, index: any) => (
      <MenuItem key={index.toString()} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <StyledContainers.FormControlStyled
      margin="normal"
      fullWidth={true}
      variant="outlined"
      disabled={disabled}
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
};

export default connect(({ cinemas }: any) => ({ cinemas }))(SelectField);
