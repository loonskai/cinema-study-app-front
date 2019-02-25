import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { match } from './../../helpers/autosuggestHighlightMatch';
import * as parse from 'autosuggest-highlight/umd/parse';
import MenuItem from '@material-ui/core/MenuItem';
import * as StyledContainers from './styled';
import { movies, cities } from './../../mocks';
const { useState } = React;

function renderInputComponent(inputProps: any) {
  const { ref, inputRef = () => {} } = inputProps;
  return (
    <StyledContainers.Input
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
      suggestions = movies;
      break;
    }
    case 'city': {
      suggestions = cities;
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

const TextField = props => {
  const [suggestions, setSuggestions] = useState([]);

  const handleSuggestionsFetchRequested = entity => obj => {
    const { value } = obj;
    const inputValue = value.trim().toLowerCase();
    if (!inputValue) {
      return;
    }
    setSuggestions(getSuggestions(entity, inputValue));
  };

  const handleSuggestionClearRequested = () => setSuggestions([]);

  const handleChange = (
    event: React.FormEvent<HTMLInputElement>,
    { newValue }: { newValue: string }
  ) => {
    props.handleChange(newValue);
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested(props.entity),
    onSuggestionsClearRequested: handleSuggestionClearRequested,
    getSuggestionValue,
    renderSuggestion
  };

  return (
    <StyledContainers.Autosuggest>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          label: props.label,
          value: props.value,
          onChange: handleChange
        }}
        theme={{
          container: 'container',
          suggestionsContainerOpen: 'suggestions-container-open',
          suggestionsList: 'suggestions-list',
          suggestion: 'suggestion'
        }}
        renderSuggestionsContainer={options => (
          <StyledContainers.PaperStyled
            {...options.containerProps}
            square={true}
          >
            {options.children}
          </StyledContainers.PaperStyled>
        )}
      />
    </StyledContainers.Autosuggest>
  );
};

export default TextField;
