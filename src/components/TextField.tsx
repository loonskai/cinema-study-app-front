import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import * as Autosuggest from 'react-autosuggest';
import * as match from 'autosuggest-highlight/umd/match';
import * as parse 'autosuggest-highlight/umd/parse';
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
  { label: 'The Shawshank Redemption' },
  { label: 'The Godfather' },
  { label: 'The Dark Knight' },
  { label: '12 Angry Men' },
  { label: "Schindler's List" },
  { label: 'Pulp Fiction' },
  { label: 'The Lord of the Rings: The Return of the King' },
  { label: 'The Good, the Bad and the Ugly' },
  { label: 'Fight Club' },
  { label: 'Forrest Gump' },
  { label: 'Inception' },
  { label: 'Star Wars: Episode V - The Empire Strikes Back' },
  { label: 'Seven Samurai' },
  { label: 'The Matrix' },
  { label: 'Leon: The Professional ' },
  { label: 'American History X' },
  { label: 'Interstellar (2014)' },
  { label: 'Casablanca' },
  { label: 'Psycho' },
  { label: 'Once Upon a Time in the West' },
  { label: 'The Pianist' }
];

// Here we should run request for suggestion list
function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  const suggestionsFiltered = suggestions.filter(suggestion => {
    const keep =
      count < 5 &&
      suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
    if (keep) {
      count += 1;
    }
    return keep;
  });
  console.log(suggestionsFiltered);
  return inputLength === 0 || suggestionsFiltered.length === 0
    ? [{ label: 'Nothing found' }]
    : suggestionsFiltered;
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);
  console.log('query---', query);
  console.log('isHighlighted---', isHighlighted);
  console.log('matches---', matches);
  console.log('parts---', parts)
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => part.highlight ? (
            <span key={index.toString()} style={{ fontWeight: 'bold' }}>
              {part.text}
            </span>
          ) : (
            <strong key={index.toString()} style={{ fontWeight: 'normal' }}>
              {part.text}
            </strong>
          )
        )}
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
