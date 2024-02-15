import React, {useEffect, useState} from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import axios from 'axios';

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

  const [users, setusers] = useState({});
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/api/v1/user/bulk');
    setusers(response.data.users);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Appbar users={users} />
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
