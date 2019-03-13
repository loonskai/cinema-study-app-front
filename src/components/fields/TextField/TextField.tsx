import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import Autosuggest from 'react-autosuggest';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';

import * as StyledContainers from './styled';
import { match } from '../../../helpers/autosuggestHighlightMatch';
import { cities } from '../../../mocks';

interface Props {
  entity?: string;
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string | Date;
  disabled?: boolean;
  error?: boolean;
  handleChange: (param: any) => any;
  withoutSuggestions?: boolean;
  movies: any;
  sessions: any;
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
  type,
  disabled,
  error,
  name,
  withoutSuggestions = false,
  movies,
  sessions
}: Props) => {
  /* Returns in case when we don't need suggestions list */
  if (withoutSuggestions) {
    const [labelWidth, setLabelWidth] = useState(0);

    return (
      <StyledContainers.Input
        name={name}
        type={type}
        label={label}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        error={error}
        /*         InputProps={{
          labelWidth: label.length * 6.5 + 25
        }} */
      />
    );
  }

  /* Returns in case when we have suggestions list */
  const [suggestions, setSuggestions]: [any, any] = useState([]);

  const getSuggestions = (entity: string, value: string): any => {
    // Get suggestion options depending on props.entity
    let suggestions;
    switch (entity) {
      case 'movie': {
        suggestions = movies.map((movie: any) => ({
          label: movie.original_title
        }));
        break;
      }
      case 'city': {
        suggestions = Object.keys(
          sessions.reduce((obj: any, session: any) => {
            obj[session.city] = true;
            return obj;
          }, {})
        ).map(city => ({ label: city }));
        break;
      }
      default: {
        suggestions = [];
        break;
      }
    }

    const suggestionsFiltered = suggestions.filter((suggestion: any) =>
      suggestion.label.toLowerCase().includes(value)
    );
    return suggestionsFiltered.length ? suggestionsFiltered : [null];
  };

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

export default connect(({ movies, sessions }: any) => ({ movies, sessions }))(
  TextField
);
