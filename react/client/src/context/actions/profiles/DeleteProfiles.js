// Import
import { axiosInstance } from "../../../helpers/axiosInstance";

// Using Axios to delete profile
export function DeleteProfiles(history) {
    axiosInstance(history)
        .delete('http://localhost:5050/delete')
        .then((res) => {
            if (localStorage.checkBox) {
                localStorage.clear();
            }
            if (sessionStorage.checkBox) {
                sessionStorage.clear();
            }
        })
        .catch((err) => console.log("err", err));
}