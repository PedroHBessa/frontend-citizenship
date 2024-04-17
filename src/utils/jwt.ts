import axios from './axios';

const isValidToken = (accessToken: string) => {
  return accessToken !== null;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export { isValidToken, setSession };
