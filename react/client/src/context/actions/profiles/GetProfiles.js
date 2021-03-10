// Import
import { axiosInstance } from "../../../helpers/axiosInstance";

// Using interceptor (response interceptor)
export function GetProfiles(history) {
    axiosInstance(history)
        .get('http://localhost:5050/profile')
        .catch((err) => console.log("err", err));
}