import {Avatar, Button, Stack, TextField, Typography} from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Users = () => {

  const userStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: 'calc(100vw - 2rem)',
    alignItems: 'center'
  };
  const userDetailsStyles = {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '0.5rem'
  };
  const buttonStyles = {
    background: 'black', 
    color: 'white', '&:hover': {
      background: 'black'
    }
  }

  const [filter, setFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  const updateFilter = (newFilter) => {
    setFilter(newFilter)
  }
  const filterUsers = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)
    setFilteredUsers(response.data.users);
  }
  const handleMoneyTransfer = (user) => {
    navigate(`/send?id=${user.userId}&name=${user.firstName}`)
  }
  useEffect(() => {
      filterUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filter])
  return (
    <>
      <Typography variant='h4'>Users</Typography>
      <TextField
        label='search users'
        variant='outlined'
        color='black'
        fullWidth
        onChange={(e) => updateFilter(e.target.value)}
      />
      <Stack spacing={2}>
        {
          filteredUsers.length > 0 && filteredUsers.map((user) => {
            return (
              <div style={userStyles} key={user.username}>
                <div style={userDetailsStyles}>
                  <Avatar>{user.firstName[0]}</Avatar>
                  <Typography>{user.firstName + ' ' + user.lastName}</Typography>
                </div>
                <Button variant='contained' sx={buttonStyles} onClick={() =>handleMoneyTransfer(user)}>Send Money</Button>
                
              </div>
            );
          })
        }
      </Stack >
    </>
  );
};

export default Users;
