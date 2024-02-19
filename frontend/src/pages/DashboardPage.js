import React from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';

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

  return (
    <div>
      <Appbar />
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
