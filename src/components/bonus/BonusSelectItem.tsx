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

const BonusSelectItem = ({ bonus, handleBonusesUpdate }: any) => {
  const bonusKey = Object.keys(bonus)[0];
  const bonusTitle =
    Object.keys(bonus)[0]
      .charAt(0)
      .toUpperCase() + bonusKey.slice(1);

  const handleBonusClick = (type: string) => {
    handleBonusesUpdate(type, bonus);
  };

  return (
    <Container>
      {bonusTitle}
      <BonusController>
        <RoundButton
          bgColor={addButtonColor}
          icon={<AddIcon />}
          type="add"
          handleClick={handleBonusClick}
        />
        <RoundButton
          bgColor={removeButtonColor}
          icon={<RemoveIcon />}
          type="remove"
          handleClick={handleBonusClick}
        />
      </BonusController>
    </Container>
  );
};

export default BonusSelectItem;
