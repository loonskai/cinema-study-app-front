import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

const StyledPoster = styled.img`
  width: 180px;
  height: auto;
`;

const MovieItem = ({ data }: { data: any }) => {
  return (
    <div>
      <h3>{data.original_title}</h3>
      <StyledPoster
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.original_title}
      />
      <Link to={`/movies/${data.id.toString()}`}>Details</Link>
    </div>
  );
};

export default MovieItem;
