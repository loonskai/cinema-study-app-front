import React from 'react';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  whiteColor,
  addButtonColor,
  editButtonColor,
  removeButtonColor,
  cancelButtonColor
} from '../../constants';

interface Props {
  type: 'edit' | 'cancel' | 'save' | 'remove';
  handleClick: () => void;
}

const Button = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.25rem;
  border-radius: 5px;
  cursor: pointer;

  & svg {
    fill: ${whiteColor};
  }

  &.edit {
    background: ${editButtonColor};
  }

  &.cancel {
    background: ${cancelButtonColor};
  }

  &.save {
    background: ${addButtonColor};
  }

  &.remove {
    background: ${removeButtonColor};
  }
`;

const UpdateItemButton = ({ type, handleClick }: Props) => {
  let icon;
  switch (type) {
    case 'edit':
      icon = <EditIcon />;
      break;
    case 'cancel':
      icon = <CancelIcon />;
      break;
    case 'save':
      icon = <SaveIcon />;
      break;
    case 'remove':
      icon = <DeleteIcon />;
      break;
    default:
      return null;
  }
  return (
    <Button onClick={handleClick} className={type}>
      {icon}
    </Button>
  );
};

export default UpdateItemButton;
