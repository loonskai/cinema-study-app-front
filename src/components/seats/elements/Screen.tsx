import React from 'react';
import styled from 'styled-components';

import { screenBgColor, screenTxtColor } from '../../../constants';

const Screen = styled.div`
  width: 300px;
  height: 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-left: 5rem;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  text-transform: uppercase;
  background: ${screenBgColor};
  color: ${screenTxtColor};
`;

export default Screen;
