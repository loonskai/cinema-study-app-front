import React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { mainColor } from './../constants';

const StyledTitle = styled.span`
  margin-bottom: 5px;
`;

const StyledRadio = styled(Radio)<any>`
  && {
    padding: 5px;
    margin-left: 10px;
  }

  &&.checked {
    color: ${mainColor};
  }
`;

const RadioFieldGroup = ({ handleChange, fields, value, groupTitle }) => {
  return (
    <RadioGroup onChange={handleChange} value={value}>
      <StyledTitle>{groupTitle}</StyledTitle>
      {fields.map(field => (
        <FormControlLabel
          key={field.value}
          value={field.value}
          label={field.label}
          control={
            <StyledRadio
              classes={{
                checked: 'checked',
                disabled: 'disabled'
              }}
            />
          }
        />
      ))}
    </RadioGroup>
  );
};

export default RadioFieldGroup;
