import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Function to validate token by calling a protected endpoint
export const validateToken = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { valid: true, user: response.data };
  } catch (error) {
    return { valid: false };
  }
};

// Function to check if token exists and is valid
export const checkAuthStatus = async () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return { isAuthenticated: false };
  }

  const validation = await validateToken(token);
  if (validation.valid) {
    return { isAuthenticated: true, user: JSON.parse(user) };
  } else {
    // Clear invalid data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { isAuthenticated: false };
  }
};