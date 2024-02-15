import React, {useState} from 'react';
import { Paper, Stack} from '@mui/material';
import Password from '../components/Password';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SignupPage = () => {
    const signupFormStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    };
    const paperStyles = {
        borderRadius: '0.5rem',
        padding: '1rem'
    };

    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    const updateDetails = (keyValue, updatedValue) => {
        setUserDetails({...userDetails, [keyValue]: updatedValue});
    };

    const handleSignup = async () => {
        const response = await axios.post('http://localhost:3000/api/v1/user/signup', userDetails);
        localStorage.setItem('token', 'Bearer ' + response.data.token)
        navigate('/dashboard')
    };

    return (
        <div style={signupFormStyles}>
            <Paper sx={paperStyles} elevation={4}>
                <Stack spacing={2}>
                    <Heading heading={'Sign Up'} />
                    <Subheading text={'Enter your information to create an account'} />
                    <InputBox label={'First Name'} onChange={(e) => updateDetails('firstName', e.target.value)} />
                    <InputBox label={'Last Name'} onChange={(e) => updateDetails('lastName', e.target.value)} />
                    <InputBox label={'Email'} onChange={(e) => updateDetails('username', e.target.value)} />
                    <Password onChange={(e) => updateDetails('password', e.target.value)} />
                    <SubmitButton buttonText={'Sign Up'} onClick={handleSignup} />
                    <BottomWarning warning={'Already have an account?'} text={'Login'} link={'/signin'} />
                </Stack>
            </Paper>
        </div>
    );
};

export default SignupPage;
