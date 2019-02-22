import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import * as Autosuggest from 'react-autosuggest';
import { match } from './../helpers/autosuggestHighlightMatch';
import * as parse from 'autosuggest-highlight/umd/parse';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

interface State {
  single: string;
  suggestions: Array<null | { label: string }>;
}

interface Props {
  label: string;
  entity: string;
}

const InputStyled = styled(({ ...other }) => <TextField {...other} />)`
  .cssLabel.cssFocused {
    color: #009688;
  }
  .cssOutlinedInput.cssFocused .notchedOutline {
    border-color: #009688;
  }
`;

function renderInputComponent(inputProps: any) {
  const { ref, inputRef = () => {} } = inputProps;
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
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
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

function getSuggestionValue(suggestion: { label: string } | null): string {
  return suggestion ? suggestion.label : '';
}

// Here we should run request for suggestion list
function getSuggestions(
  entity: string,
  value: string
): Array<null | { label: string }> {
  // Get suggestion options depending on props.entity
  let suggestions;
  switch (entity) {
    case 'movie': {
      suggestions = [
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
      break;
    }
    case 'city': {
      suggestions = [
        { label: 'Minsk' },
        { label: 'Brest' },
        { label: 'Vitebsk' },
        { label: 'Grodno' },
        { label: 'Gomel' },
        { label: 'Mogilev' }
      ];
      break;
    }
    default: {
      suggestions = [];
      break;
    }
  }

  const suggestionsFiltered = suggestions.filter(suggestion =>
    suggestion.label.toLowerCase().includes(value)
  );
  return suggestionsFiltered.length === 0 ? [null] : suggestionsFiltered;
}

function renderSuggestion(
  suggestion: null | { label: string },
  { query, isHighlighted }: { query: string; isHighlighted: boolean }
) {
  if (!suggestion) {
    return (
      <MenuItem component="div">
        <span>Nothing found</span>
      </MenuItem>
    );
  }
  const matches = match(suggestion.label, query);
  const parts: Array<{ text: string; highlight: boolean }> =
    matches && parse(suggestion.label, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index: number) =>
          part.highlight ? (
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

class TextFieldStyled extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      single: '',
      suggestions: []
    };
  }

  handleSuggestionsFetchRequested = entity => ({
    value
  }: {
    value: string;
  }) => {
    const inputValue = value.trim().toLowerCase();
    if (!inputValue || inputValue.length < 2) {
      return;
    }
    this.setState({
      suggestions: getSuggestions(entity, inputValue)
    });
  };

  handleSuggestionClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (name: string | number) => (
    event: React.FormEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    this.setState({
      single: newValue
    });
  };

  render() {
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested(
        this.props.entity
      ),
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

export default TextFieldStyled;
