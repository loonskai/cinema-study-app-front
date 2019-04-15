import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { addButtonColor, removeButtonColor, greyColor } from '../../constants';

import RoundButton from '../buttons/RoundButton';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${greyColor};
  }
`;

const BonusController = styled.div`
  display: flex;
  align-items: center;
`;

const ValueContainer = styled.div``;

const BonusSelectItem = ({ bonus, handleBonusesUpdate, value }: any) => {
  const bonusTitle = `${bonus.title.charAt(0).toUpperCase()}${bonus.title.slice(
    1
  )} ($${bonus.price})`;

  const handleBonusClick = (type: string) => {
    handleBonusesUpdate(type, bonus);
  };

  return (
    <Container>
      {bonusTitle}
      <BonusController>
        <ValueContainer>{value}</ValueContainer>
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
          disabled={!value}
          handleClick={handleBonusClick}
        />
      </BonusController>
    </Container>
  );
};

export default BonusSelectItem;
