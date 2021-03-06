import React from 'react';
import styled from 'styled-components';

import { mainDarkColor } from './../constants';

const StyledTitle = styled.h1`
  width: 100%;
  margin: 0;
  font-size: 1.125rem;
  text-align: center;
  color: ${mainDarkColor};
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PageTitle = ({ text }: { text: string }) => (
  <StyledTitle>{text}</StyledTitle>
);

export default PageTitle;
