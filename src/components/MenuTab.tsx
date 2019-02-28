import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';

import { whiteColor } from './../constants';

const TabContainer = styled(Tab)<any>`
  && {
    color: ${whiteColor};
    opacity: 1;
    font-family: 'Bitter', serif;
  }
`;

interface Props {
  value: string;
  label: string;
  to: string;
}

const MenuTab = ({ value, label, to }: Props) => (
  <TabContainer value={value} label={label} component={Link} to={to} />
);

export default MenuTab;
