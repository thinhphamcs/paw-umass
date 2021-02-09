// Import
import axios from 'axios';

// variables needed
const baseURL = process.env.REACT_APP_BACKEND_URL; // For the same backend-server-database url
let headers = {}; // For authentication

// We check if there is a token
if (localStorage.getItem('token')) {
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`; // Format it as follow Bearer + token
}

// This will create the axiosInstance
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
});

export default axiosInstance;