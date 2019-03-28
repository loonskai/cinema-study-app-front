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

const UpdateItemButton = ({ type }: Props) => {
  switch (type) {
    case 'edit':
      return (
        <Button className="edit">
          <EditIcon />
        </Button>
      );
    case 'save':
      return (
        <Button className="save">
          <SaveIcon />
        </Button>
      );
    case 'remove':
      return (
        <Button className="remove">
          <DeleteIcon />
        </Button>
      );
    default:
      return null;
  }
};

export default UpdateItemButton;
