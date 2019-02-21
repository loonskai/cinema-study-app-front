import * as React from 'react';
import { findDOMNode } from 'react-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';

const StyledFormControl = styled(FormControl)`
  && {
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

const StyledInputLabel = styled(InputLabel)`
  &&.focused {
    color: #009688;
  }
`;

const StyledOutlinedInput = styled(OutlinedInput)`
  && {
    min-width: 230px;
  }
  &&.outlined fieldset {
    border-color: #009688;
  }
`;

class SelectField extends React.Component {
  state = {
    age: '',
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { label } = this.props;
    return (
      <StyledFormControl margin="normal" fullWidth={true} variant="outlined">
        <StyledInputLabel
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="outlined-age-simple"
          classes={{
            focused: 'focused'
          }}
        >
          {label}
        </StyledInputLabel>
        <Select
          value={this.state.age}
          onChange={this.handleChange}
          input={
            <StyledOutlinedInput
              labelWidth={this.state.labelWidth}
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
          <MenuItem value={10}>Centralny Cinema</MenuItem>
          <MenuItem value={20}>Avrora</MenuItem>
          <MenuItem value={30}>Pobeda</MenuItem>
        </Select>
      </StyledFormControl>
    );
  }
}

export default SelectField;
