import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import * as Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/umd/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/umd/parse';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

/* interface Props {
  label: string;
} */

const InputStyled = styled(({ ...other }) => <TextField {...other} />)`
  .cssLabel.cssFocused {
    color: #009688;
  }
  .cssOutlinedInput.cssFocused .notchedOutline {
    border-color: #009688;
  }
`;

function renderInputComponent(inputProps) {
  return (
    <InputStyled
      fullWidth={true}
      margin="normal"
      variant="outlined"
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
      {...inputProps}
    />
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' }
];

// Here we should run request for suggestion list
function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
        if (keep) {
          count += 1;
        }
        return keep;
      });
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  /*   const matches = AutosuggestHighlightMatch(suggestion.label, query);
  const parts = AutosuggestHighlightParse(suggestion.label, matches); */
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {/* {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )} */}
        {suggestion.label}
      </div>
    </MenuItem>
  );
}

class TextFieldStyled extends React.Component {
  state = {
    single: '',
    suggestions: []
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleSuggestionClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
  };

  render() {
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          label: this.props.label,
          value: this.state.single,
          onChange: this.handleChange('single')
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square={true}>
            {options.children}
          </Paper>
        )}
      />
    );
  }
}

/* const TextFieldStyled = ({ label }: Props) => {
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
}; */

export default TextFieldStyled;
