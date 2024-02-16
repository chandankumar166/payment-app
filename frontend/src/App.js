import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import {ThemeProvider, createTheme} from '@mui/material';
import SigninPage from './pages/SigninPage';
import DashboardPage from './pages/DashboardPage';
import MoneyTransfer from './pages/MoneyTransfer';

function App() {

  const theme = createTheme({
    palette: {
      black: {
        main: 'black',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/signin' element={<SigninPage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/send' element={<MoneyTransfer />}/>
          </Routes>
        </BrowserRouter>
      </div>

    </ThemeProvider>
  );
}

export default App;
