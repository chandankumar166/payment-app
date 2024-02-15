import {Typography} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';

const BottomWarning = ({warning, text, link}) => {
    const linkStyles = {
        '&: focus, &: hover, &: visited, &: link, &:active': {
            textDecoration: 'none'
        }
    };
    return (
        <Typography sx={{textAlign: 'center'}}>{warning}
            <Link to={link} style={linkStyles}>{text}</Link>
        </Typography>
    );
};

export default BottomWarning;
