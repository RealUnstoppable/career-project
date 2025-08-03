import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const navigate = useNavigate();

  const loginUser = async (username, password) => {
    try {
      // FIX: Corrected the API endpoint
      let response = await axios.post('https://career-compass-backend-ew6d.onrender.com/api/auth/login/', {
        username,
        password,
      });
      const userData = { username };
      setAuthToken(response.data.key);
      setUser(userData);
      localStorage.setItem('authToken', response.data.key);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login Failed! Please check your username and password.');
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      // FIX: Corrected the API endpoint
      await axios.post('https://career-compass-backend-ew6d.onrender.com/api/auth/registration/', {
        username,
        email,
        password,
        password2: password,
      });
      await loginUser(username, password);
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration Failed! That username or email may already be taken.');
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const contextData = {
    user,
    authToken,
    loginUser,
    registerUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;