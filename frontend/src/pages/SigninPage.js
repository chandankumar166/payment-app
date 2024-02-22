import {Paper, Stack} from '@mui/material';
import React, {useState} from 'react';
import Password from '../components/Password';
import Heading from '../components/Heading';
import Subheading from '../components/Subheading';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import BottomWarning from '../components/BottomWarning';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SigninPage = () => {

  const signinFormStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    paddingTop: '7rem',
    height: 'calc(100vh - 7rem)'
  };
  const paperStyles = {
    borderRadius: '0.5rem',
    padding: '1rem'
  };

  const [userDetails, setUserDetails] = useState({});
  const [isError, setIsError] = useState({username: false, password: false});
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const updateUserDetails = (key, value) => {
    setUserDetails({...userDetails, [key]: value});
  };
  const displayError = (field) => {
    setIsError({[field]: true});
    setErrorMessage({[field]: `${field} is required`});
  };

  const handleSignIn = async () => {
    const fields = ['username', 'password'];
    if (!fields.every(field => {
      if (!userDetails.hasOwnProperty(field) || userDetails[field].trim() === '') {
        displayError(field);
        return false;
      }
      return true;
    })) return;
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', userDetails);
      localStorage.setItem('token', 'Bearer ' + response.data.token);
      navigate('/dashboard');
    }
    catch (error) {
      if (error.response.status === 411) {
        setIsError({username: true});
        setErrorMessage({username: 'Email is not valid'});
      }
      else if (error.response.status === 401) {
        setIsError({username: false, password: true});
        setErrorMessage({username: '', password: 'Incorrect Password'});
      }
    }
  };

  return (
    <div style={signinFormStyles}>
      <Paper elevation={4} sx={paperStyles}>
        <Stack spacing={2}>
          <Heading
            heading={'Sign In'}
          />
          <Subheading
            text={'Enter your credentials to access your account'}
          />
          <InputBox
            label={'Email'}
            error={isError?.username}
            errorMessage={errorMessage?.username}
            onChange={(e) => updateUserDetails('username', e.target.value)}
          />
          <Password
            error={isError?.password}
            errorMessage={errorMessage?.password}
            onChange={(e) => updateUserDetails('password', e.target.value)}
          />
          <SubmitButton
            buttonText={'Sign In'}
            onClick={handleSignIn}
          />
          <BottomWarning
            warning={`Don't have an account?`}
            text={'Sign Up'}
            link={'/signup'}
          />
        </Stack>
      </Paper>
    </div>
  );
};

export default SigninPage;
