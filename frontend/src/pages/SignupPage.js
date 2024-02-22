import React, {useState} from 'react';
import {Paper, Stack} from '@mui/material';
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
    const [isError, setIsError] = useState({firstName: false, lastName: false, username: false, password: false});
    const [errorMessage, setErrorMessage] = useState({});
    const navigate = useNavigate();

    const updateDetails = (keyValue, updatedValue) => {
        setUserDetails({...userDetails, [keyValue]: updatedValue.trim()});
    };
    const displayError = (field) => {
        setIsError({[field]: true});
        setErrorMessage({[field]: `${field} is required`});
    };

    const handleSignup = async () => {
        const fields = ['firstName', 'lastName', 'username', 'password'];
        if (!fields.every(field => {
            if (!userDetails.hasOwnProperty(field) || userDetails[field].trim() === '') {
                displayError(field);
                return false;
            }
            return true;
        })) return;
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signup', userDetails);
            localStorage.setItem('token', 'Bearer ' + response.data.token);
            navigate('/dashboard');
        }
        catch (error) {
            if (error.response.status === 411) {
                setIsError({username: true})
                setErrorMessage({username: 'Email is not valid'})
            }
        }
    };

    return (
        <div style={signupFormStyles}>
            <Paper sx={paperStyles} elevation={4}>
                <Stack spacing={2}>
                    <Heading
                        heading={'Sign Up'}
                    />
                    <Subheading
                        text={'Enter your information to create an account'}
                    />
                    <InputBox
                        error={isError?.firstName}
                        errorMessage={errorMessage?.firstName}
                        label={'First Name'}
                        onChange={(e) => updateDetails('firstName', e.target.value)}
                    />
                    <InputBox
                        error={isError?.lastName}
                        errorMessage={errorMessage?.lastName}
                        label={'Last Name'}
                        onChange={(e) => updateDetails('lastName', e.target.value)}
                    />
                    <InputBox
                        error={isError?.username}
                        errorMessage={errorMessage?.username}
                        label={'Email'}
                        onChange={(e) => updateDetails('username', e.target.value)}
                    />
                    <Password
                        error={isError?.password}
                        errorMessage={errorMessage?.password}
                        onChange={(e) => updateDetails('password', e.target.value)}
                    />
                    <SubmitButton
                        buttonText={'Sign Up'}
                        onClick={handleSignup}
                    />
                    <BottomWarning
                        warning={'Already have an account?'}
                        text={'Login'}
                        link={'/signin'}
                    />
                </Stack>
            </Paper>
        </div>
    );
};

export default SignupPage;
