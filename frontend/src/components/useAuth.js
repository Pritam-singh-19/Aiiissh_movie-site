import { useState, useEffect } from 'react';
import { AUTH_USERNAME, AUTH_PASSWORD } from '../config';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const username = AUTH_USERNAME;
  const password = AUTH_PASSWORD;


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (usernameInput, passwordInput) => {
    return new Promise((resolve, reject) => {
      if (usernameInput === username && passwordInput === password) {
        localStorage.setItem('isLoggedIn', 'true');
        setIsAuthenticated(true);
        resolve();
      } else {
        reject('Invalid username or password');
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;