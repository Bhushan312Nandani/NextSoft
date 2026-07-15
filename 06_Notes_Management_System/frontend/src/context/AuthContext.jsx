import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setUser({ id: userId });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userId);
    setUser({ id: res.data.userId });
    return res.data;
  };

  const register = async (email, password) => {
    const res = await api.post('/auth/register', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userId);
    setUser({ id: res.data.userId });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  const value = { user, login, register, logout, loading };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
