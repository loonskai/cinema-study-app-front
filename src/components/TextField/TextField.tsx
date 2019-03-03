import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';

import * as StyledContainers from './styled';
import { match } from './../../helpers/autosuggestHighlightMatch';
import { movies, cities } from './../../mocks';

interface Props {
  entity?: string;
  id?: string;
  label?: string;
  type?: string;
  value?: string | Date;
  handleChange: (param: any) => any;
  withoutSuggestions?: boolean;
}

function renderInputComponent(inputProps: any) {
  const { ref, inputRef = () => {} } = inputProps;
  // Hide 'passing refs to functional component' error
  const propsWithoutRef = Object.assign({}, inputProps, {
    ref: null
  });
  return (
    <StyledContainers.Input
      InputProps={{
        inputRef: (node: HTMLElement) => {
          ref(node);
          inputRef(node);
        }
      }}
      {...propsWithoutRef}
    />
  );
}

function getSuggestionValue(suggestion: { label: string } | null): string {
  return suggestion ? suggestion.label : '';
}

function getSuggestions(
  entity: string,
  value: string
): Array<null | { label: string }> {
  // Get suggestion options depending on props.entity
  let suggestions;
  switch (entity) {
    case 'movie': {
      suggestions = movies as Array<{ label: string }>;
      break;
    }
    case 'city': {
      suggestions = cities as Array<{ label: string }>;
      break;
    }
    default: {
      suggestions = [] as Array<{ label: string }>;
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

const TextField = ({
  handleChange,
  entity,
  label,
  value,
  withoutSuggestions = false
}: Props) => {
  /* Returns in case when we don't need suggestions list */
  if (withoutSuggestions) {
    return <StyledContainers.Input label={label} />;
  }

  const [suggestions, setSuggestions]: [any, any] = useState([]);

  const handleSuggestionsFetchRequested = (entity: any) => (obj: {
    value: string;
    reason: string;
  }) => {
    const { value } = obj;
    const inputValue = value.trim().toLowerCase();
    if (!inputValue) {
      return;
    }
    setSuggestions(getSuggestions(entity, inputValue));
  };

  const handleSuggestionClearRequested = () => setSuggestions([]);

  const autosuggestProps = {
    renderInputComponent,
    suggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested(entity),
    onSuggestionsClearRequested: handleSuggestionClearRequested,
    getSuggestionValue,
    renderSuggestion
  };

  return (
    <StyledContainers.Autosuggest>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          label,
          value: value as string,
          onChange: (
            e: React.FormEvent<HTMLInputElement>,
            { newValue }: { newValue: string }
          ) => {
            handleChange(newValue);
          }
        }}
        theme={{
          container: 'container',
          suggestionsContainerOpen: 'suggestions-container-open',
          suggestionsList: 'suggestions-list',
          suggestion: 'suggestion'
        }}
        renderSuggestionsContainer={(options: any) => (
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
