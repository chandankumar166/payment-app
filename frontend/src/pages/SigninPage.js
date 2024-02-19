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

  const [existingUser, setExistingUser] = useState({});
  const [isError, setIsError] = useState({email: false, password: false});
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const updateExistingUser = (key, value) => {
    setExistingUser({...existingUser, [key]: value});
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', existingUser);
      localStorage.setItem('token', 'Bearer ' + response.data.token);
      navigate('/dashboard');
    }
    catch (error) {
      if (error.response.status === 411) {
        setIsError({...isError, email: true})
        setErrorMessage({...errorMessage, email: 'User does not exist'});
      }
      else if (error.response.status === 401) {
        setIsError({email: false, password: true})
        setErrorMessage({email: '', password: 'Incorrect Password'})
      }
    }
  };

  return (
    <div style={signinFormStyles}>
      <Paper elevation={4} sx={paperStyles}>
        <Stack spacing={2}>
          <Heading heading={'Sign In'} />
          <Subheading text={'Enter your credentials to access your account'} />
          <InputBox label={'Email'} error={isError} errorMessage={errorMessage} onChange={(e) => updateExistingUser('username', e.target.value)} />
          <Password error={isError} errorMessage={errorMessage} onChange={(e) => updateExistingUser('password', e.target.value)} />
          <SubmitButton buttonText={'Sign In'} onClick={handleSignIn} />
          <BottomWarning warning={`Don't have an account?`} text={'Sign Up'} link={'/signup'} />
        </Stack>
      </Paper>
    </div>
  );
};

export default SigninPage;
