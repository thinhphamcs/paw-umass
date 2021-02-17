// Import
import axios from 'axios';

export default (history = null) => {
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
            if (error.response.status === 403) {
                localStorage.removeItem("token");
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
            if (error.response.status === 404) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            }
        }
    );
    return axiosInstance;
};