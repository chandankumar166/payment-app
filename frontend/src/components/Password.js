import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, {useState} from 'react';

const Password = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <>
            <FormControl>
                <InputLabel color='black'>Password</InputLabel>
                <OutlinedInput
                    label="password"
                    color='black'
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={handleShowPassword}>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </>
    );
};

export default Password;
