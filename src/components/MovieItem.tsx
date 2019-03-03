import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';

import DefaultButton from './../components/buttons/DefaultButton';

const Container = styled(Card)<any>`
  && {
    width: 100%;
    max-width: 200px;
    margin: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledTitle = styled.span`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  text-align: center;
`;

const StyledPoster = styled.img`
  width: auto;
  height: auto;
  max-width: 200px;
  align-self: center;
`;

const MovieItem = ({ data }: { data: any }) => {
  return (
    <Container>
      <StyledTitle>{data.original_title}</StyledTitle>
      <StyledPoster
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.original_title}
      />
      <DefaultButton text="Details" to={`/movies/${data.id.toString()}`} />
    </Container>
  );
};

export default MovieItem;
