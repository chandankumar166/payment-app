import {AppBar, Avatar, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import VerifyUser from './VerifyUser';

const Appbar = () => {
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
    const [loggedInUser, setLoggedInUser] = useState({});
    const [anchorEl, setAnchorE1] = useState(null);
    const navigate = useNavigate();

    const fetchUser = async () => {
        const user = await VerifyUser();
        if (!user) {
            navigate('/signin');
            return;
        }
        setLoggedInUser(user);
    };
    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const openMenu = (e) => {
        setAnchorE1(e.currentTarget);
    };
    const closeMenu = (e) => {
        localStorage.removeItem('token');
        navigate('/signin')
        setAnchorE1(null);
    }
    const handleClose = (e) => {
        setAnchorE1(null)
    }

    return (
        <AppBar sx={{background: 'transparent'}} position='static'>
            <Toolbar style={toolbarStyles}>
                <Typography variant='h5'><strong>Payments App</strong></Typography>
                <div style={avatarStyles}>
                    <Typography component='p'>Hello {loggedInUser.firstName +' ' + loggedInUser.lastName}</Typography>
                    <Avatar onClick={openMenu}>{loggedInUser.firstName ? loggedInUser.firstName[0].toUpperCase() : loggedInUser.lastName && loggedInUser.lastName[0].toUpperCase()}</Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My Account</MenuItem>
                        <MenuItem onClick={closeMenu}>Sign out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
