import React from 'react';
import styled from 'styled-components';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  whiteColor,
  addButtonColor,
  editButtonColor,
  removeButtonColor
} from '../../constants';

interface Props {
  type: 'edit' | 'save' | 'remove';
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

  &.save {
    background: ${addButtonColor};
  }

  &.remove {
    background: ${removeButtonColor};
  }
`;

const UpdateItemButton = ({ type, handleClick }: Props) => {
  let icon, buttonClass;
  switch (type) {
    case 'edit':
      icon = <EditIcon />;
      buttonClass = 'edit';
      break;
    case 'save':
      icon = <SaveIcon />;
      buttonClass = 'save';
      break;
    case 'remove':
      icon = <DeleteIcon />;
      buttonClass = 'remove';
      break;
    default:
      return null;
  }
  return (
    <Button onClick={handleClick} className={buttonClass}>
      {icon}
    </Button>
  );
};

export default UpdateItemButton;
