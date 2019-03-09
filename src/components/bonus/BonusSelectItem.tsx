import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import RoundButton from '../buttons/RoundButton';
import { addButtonColor, removeButtonColor } from '../../constants';

const Container = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BonusController = styled.div``;

const BonusSelectItem = ({ title, bonus, handleChange }: any) => {
  const bonusTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <Container>
      {bonusTitle}
      <BonusController>
        <RoundButton
          bgColor={addButtonColor}
          icon={<AddIcon />}
          handleClick={handleChange}
        />
        <RoundButton
          bgColor={removeButtonColor}
          icon={<RemoveIcon />}
          handleClick={handleChange}
        />
      </BonusController>
    </Container>
  );
};

export default BonusSelectItem;
