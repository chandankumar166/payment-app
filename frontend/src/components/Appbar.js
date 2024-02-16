import {AppBar, Avatar, Toolbar, Typography} from '@mui/material';
import React from 'react';

const Appbar = ({user}) => {
    const toolbarStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        color: 'black'
    };
    const avatarStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '8rem',
        gap: '1rem',
        color: 'black'
    };

  return (
      <AppBar sx={{background: 'transparent'}} position='static'>
          <Toolbar style={toolbarStyles}>
              <Typography variant='h5'><strong>Payments App</strong></Typography>
              <div style={avatarStyles}>
                  <Typography component='p'>Hello {user?.firstName + user?.lastName}</Typography>
                  <Avatar>C</Avatar>
              </div>
          </Toolbar>
      </AppBar>
  );
}

export default Appbar;
