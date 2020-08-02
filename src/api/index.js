import axios from 'axios';
import { baseURL } from '../constants';

const axiosInstance = axios.create({
    baseURL,
    // timeout: 2500,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    config => {
        config.headers["token"] = localStorage.getItem('token');
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default axiosInstance;
