// Import
import axios from 'axios';
export function axiosInstance(history = null) {
    // variables needed
    const baseURL = process.env.REACT_APP_BACKEND_URL; // For the same backend-server-database url
    let headers = {}; // For authentication

    // We check if there is a token for both localStorage and sessionStorage
    if (localStorage.getItem('token')) {
        headers.Authorization = localStorage.getItem('token'); // Then add that token to header
    }
    if (sessionStorage.getItem('token')) {
        headers.Authorization = sessionStorage.getItem('token'); // Then add that token to header
    }

    // This will create the Axios Instance
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers,
    });

    // Using axios interceptor (response type)
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
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
                case 404:
                    localStorage.clear();
                    sessionStorage.clear();
                    if (history) {
                        window.location = "/";
                    }
                    else {
                        window.location = "/";
                    }
                    break;
                default:
                    return new Promise((resolve, reject) => {
                        reject(error);
                    });
            }
        }
    );
    return axiosInstance;
};