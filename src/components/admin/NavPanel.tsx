import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { mainColor } from '../../constants';

const NavPanel = () => {
  return (
    <Paper>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <MovieCreationIcon />
          </ListItemIcon>
          <ListItemText inset primary="Add cinema" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <VideoLabelIcon />
          </ListItemIcon>
          <ListItemText inset primary="Add hall" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <RoomServiceIcon />
          </ListItemIcon>
          <ListItemText inset primary="Add services" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText inset primary="Create session" />
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default NavPanel;
