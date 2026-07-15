import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  transactions: [],
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

const AppReducer = (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return { ...state, loading: false, transactions: action.payload };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t._id !== action.payload) };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'TRANSACTION_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await api.get('/transactions');
      dispatch({ type: 'GET_TRANSACTIONS', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.response?.data?.error || 'Error' });
    }
  }

  async function deleteTransaction(id) {
    try {
      await api.delete(`/transactions/${id}`);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.response?.data?.error || 'Error' });
    }
  }

  async function addTransaction(transaction) {
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
      const res = await api.post('/transactions', transaction, config);
      dispatch({ type: 'ADD_TRANSACTION', payload: res.data.data });
    } catch (err) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: err.response?.data?.error || 'Error' });
    }
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      getTransactions,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
