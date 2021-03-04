import { axiosInstance } from "../../../helpers/axiosInstance"

export function GetProfiles(history) {
    axiosInstance(history)
        .get('http://localhost:5050/profile')
        .then((res) => console.log('yo im at profile', res))
        .catch((err) => console.log("err", err));
}