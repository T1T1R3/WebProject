// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    return savedAuthState === 'true';
  });

  const [username, setUsername] = useState(() =>{
    return localStorage.getItem('username') || '';
  });

  const login = (user) => {
    console.log(user.username);
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    localStorage.setItem('username', user.username);
    setUsername(user.username);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
  };

  useEffect(() => {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    const savedUsername = localStorage.getItem('username');
    if (savedAuthState === 'true') {
      setIsAuthenticated(true);
      setUsername(savedUsername);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
