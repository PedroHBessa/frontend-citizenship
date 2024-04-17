import axios from 'axios';
import Configuration from '../config/Configuration';

const config = new Configuration();

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export default axiosInstance;
