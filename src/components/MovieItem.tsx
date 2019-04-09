import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';

import Movie from '../classes/Movie';
import DefaultButton from './../components/buttons/DefaultButton';

const Container = styled(Card)<any>`
  && {
    max-width: 200px;
    margin: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledTitle = styled.span`
  width: 100%;
  height: 3.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3125rem;
  text-align: center;
`;

const StyledPoster = styled.img`
  width: auto;
  height: auto;
  max-width: 200px;
  align-self: center;
`;

const MovieItem = ({ data }: { data: Movie }) => (
  <Container>
    <StyledTitle>{data.title}</StyledTitle>
    <StyledPoster src={data.poster} alt={data.title} />
    <DefaultButton text="Details" to={`/movies/${data.id}`} />
  </Container>
);

export default MovieItem;
