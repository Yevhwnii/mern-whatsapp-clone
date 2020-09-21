import React from 'react';

import './Sidebar.css';

import { DonutLarge, Chat, MoreVert } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src='https://www.w3schools.com/howto/img_avatar.png' />
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
