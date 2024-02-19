import axios from 'axios';

const VerifyUser = async () => {

    const authHeader = localStorage.getItem('token');
    if (!authHeader) {
        return null;
    }
    const isUserLoggedIn = await axios.get('http://localhost:3000/api/v1/user/me', {
        headers: {
            Authorization: authHeader
        }
    });
    if (isUserLoggedIn.status === 403) {
        return null;
    }
    return isUserLoggedIn.data.user;
};

export default VerifyUser;
