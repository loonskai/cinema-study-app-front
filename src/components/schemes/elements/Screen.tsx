import React from 'react';
import styled from 'styled-components';

import { screenBgColor, screenTxtColor } from '../../../constants';

const Screen = styled.div`
  min-width: 300px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
  text-transform: uppercase;
  background: ${screenBgColor};
  color: ${screenTxtColor};
`;

export default Screen;
