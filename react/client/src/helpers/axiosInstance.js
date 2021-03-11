// Import
import axios from 'axios';

export function axiosInstance(history = null) {
    // variables needed
    const baseURL = process.env.REACT_APP_BACKEND_URL; // For the same backend-server-database url
    let headers = {}; // For authentication

    // We check if there is a token
    // `Bearer ${localStorage.getItem('token')}`
    if (localStorage.getItem('token')) {
        headers.Authorization = localStorage.getItem('token'); // Format it as follow Bearer + token
    }
    if (sessionStorage.getItem('token')) {
        headers.Authorization = sessionStorage.getItem('token'); // Format it as follow Bearer + token
    }

    // This will create the axiosInstance
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers,
    });

    // Using axios interceptor
    axiosInstance.interceptors.response.use(
        (response) => new Promise((resolve, reject) => {
            resolve(response);
        }), (error) => {
            if (!error.response) {
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            }
            switch (error.response.status) {
                case 204:
                case 400:
                case 401:
                case 403:
                case 404:
                    localStorage.removeItem("token");
                    window.location = "/";
                    break;
                default:
                    localStorage.removeItem("token");
                    window.location = "/";
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
            }
        }
    );
    return axiosInstance;
};