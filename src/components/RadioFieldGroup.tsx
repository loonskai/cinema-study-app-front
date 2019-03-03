import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioFieldGroup = ({ handleChange, fields, value }) => {
  return (
    <RadioGroup onChange={handleChange} value={value}>
      {fields.map(field => (
        <FormControlLabel
          key={field.value}
          value={field.value}
          label={field.label}
          control={<Radio />}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioFieldGroup;
