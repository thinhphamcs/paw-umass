// Import
import { axiosInstance } from "../../../helpers/axiosInstance";

// Using interceptor (response interceptor)
export function GetProfiles(history) {
    axiosInstance(history)
        .get('/settings/profile')
        .catch((err) => console.log("err", err));
}