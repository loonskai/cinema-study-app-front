import React from 'react';
import styled from 'styled-components';

import { mainDarkColor } from './../constants';

const StyledTitle = styled.h1`
  width: 100%;
  margin: 0;
  font-size: 18px;
  text-align: center;
  color: ${mainDarkColor};
  @media screen and (min-width: 768px) {
    font-size: 24px;
  }
`;

interface Props {
  text: string;
}

const PageTitle = ({ text }: Props) => <StyledTitle>{text}</StyledTitle>;

export default PageTitle;
