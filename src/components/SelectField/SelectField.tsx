import * as React from 'react';
import { findDOMNode } from 'react-dom';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as StyledContainers from './styled';
const { useState } = React;

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

  getOptions = (entity: string) => {
    let options;
    switch (entity) {
      case 'cinema': {
        options = [
          { label: 'Avrora' },
          { label: 'Oktyabr' },
          { label: 'Moskva' },
          { label: 'Silver Screen' },
          { label: 'Pobeda' }
        ];
        break;
      }
      default: {
        options = [];
        break;
      }
    }
    return options.map((option, index) => (
      <MenuItem key={index.toString()} value={index}>
        {option.label}
      </MenuItem>
    ));
  };

  render() {
    const { label, entity } = this.props;
    return (
      <StyledContainers.FormControlStyled
        margin="normal"
        fullWidth={true}
        variant="outlined"
      >
        <StyledContainers.InputLabelStyled
          ref={ref => {
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
          value={this.state.age}
          onChange={this.handleChange}
          input={
            <StyledContainers.OutlinedInputStyled
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
          {this.getOptions(entity)}
        </Select>
      </StyledContainers.FormControlStyled>
    );
  }
}

export default SelectField;
