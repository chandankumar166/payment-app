import React, {useEffect, useState} from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const DashboardPage = () => {
  const bodyStyles = {
    padding: '1rem',
  };
  const moneyTransferStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1rem',
  };

  const [loggedInUser, setLoggedInUser] = useState({});
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/signin')
    }
    try {
      const response = await axios.get('http://localhost:3000/api/v1/user/me', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setLoggedInUser(response.data.user);
    }
    catch (e) {
      navigate('/signin');
    }
  };
  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Appbar user={loggedInUser} />
      <div style={bodyStyles}>
        <Balance />
        <div style={moneyTransferStyles}>
          <Users />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
