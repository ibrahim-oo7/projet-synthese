import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import { setAuthenticated, loginSucces } from './features/auth/authSlice';
import { checkAuthStatus } from './features/auth/authAPI';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Set up axios interceptor for token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const validateAuth = async () => {
      const authStatus = await checkAuthStatus();
      if (authStatus.isAuthenticated) {
        dispatch(loginSucces(authStatus.user));
      } else {
        dispatch(setAuthenticated(false));
      }
    };

    validateAuth();
  }, [dispatch]);

  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <AppContent />
    </PersistGate>
  );
}

export default App;