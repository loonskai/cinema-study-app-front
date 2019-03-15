import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';

import * as StyledContainers from './styled';
import { match } from '../../../helpers/autosuggestHighlightMatch';

interface Props {
  id?: string;
  name?: string;
  label?: string;
  type?: string;
  value?: string | Date;
  disabled?: boolean;
  error?: boolean;
  initialSuggestions?: any;
  handleChange: (param: any) => any;
  handleSelect?: (param: any) => any;
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
  handleSelect,
  label,
  value,
  type,
  disabled,
  error,
  name,
  initialSuggestions,
  withoutSuggestions = false
}: Props) => {
  /* Returns in case when we don't need suggestions list */
  if (withoutSuggestions) {
    return (
      <StyledContainers.Input
        name={name}
        type={type}
        label={label}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        error={error}
        InputProps={{ labelWidth: 0 }}
      />
    );
  }

  /* Returns in case when we have suggestions list */
  const [relevantSuggestions, setRelevantSuggestions]: [any, any] = useState(
    []
  );

  const getSuggestions = (initialSuggestions: any, value: string): any => {
    const suggestionsFiltered = initialSuggestions.filter((suggestion: any) =>
      suggestion.label.toLowerCase().includes(value)
    );
    return suggestionsFiltered.length ? suggestionsFiltered : [null];
  };

  const handleSuggestionsFetchRequested = (suggestions: any) => (obj: {
    value: string;
    reason: string;
  }) => {
    const { value } = obj;
    const inputValue = value.trim().toLowerCase();
    if (!inputValue) {
      return;
    }
    setRelevantSuggestions(getSuggestions(suggestions, inputValue));
  };

  const handleSuggestionClearRequested = () => setRelevantSuggestions([]);

  const autosuggestProps = {
    renderInputComponent,
    suggestions: relevantSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested(
      initialSuggestions
    ),
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
          disabled,
          onChange: (
            e: React.FormEvent<HTMLInputElement>,
            { newValue }: { newValue: string }
          ) => {
            handleChange(newValue);
          }
        }}
        onSuggestionSelected={(e, { suggestionValue }) =>
          handleSelect && handleSelect(suggestionValue)
        }
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

export default connect(({ movies }: any) => ({ movies }))(TextField);
