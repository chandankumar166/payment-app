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
    marginTop: '7rem',
    height: '100vh'
  };
  const paperStyles = {
    borderRadius: '0.5rem',
    padding: '1rem'
  };

  const [existingUser, setExistingUser] = useState({})
  const navigate = useNavigate();

  const updateExistingUser = (key, value) => {
    setExistingUser({...existingUser, [key]: value})
  }

  const handleSignIn = async () => {
    const response = await axios.post('http://localhost:3000/api/v1/user/signin', existingUser);
    localStorage.setItem('token', 'Bearer ' + response.data.token);
    navigate('/dashboard')
  }

  return (
    <div style={signinFormStyles}>
      <Paper elevation={4} sx={paperStyles}>
        <Stack spacing={2}>
          <Heading heading={'Sign In'}/>
          <Subheading text={'Enter your credentials to access your account'} />
          <InputBox label={'Email'} onChange={(e) => updateExistingUser('username', e.target.value)}/>
          <Password onChange={(e) => updateExistingUser('password', e.target.value)}/>
          <SubmitButton buttonText={'Sign In'} onClick={handleSignIn} />
          <BottomWarning warning={`Don't have an account?`} text={'Sign Up'} link={'/signup'} />
        </Stack>
      </Paper>
    </div>
  );
};

export default SigninPage;
