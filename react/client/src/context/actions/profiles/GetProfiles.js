import axiosInstance from "../../../helpers/axiosInstance"

export default (history) => {
    axiosInstance(history)
        .get('/home')
        .then((res) => console.log('yo im at home', res))
        .catch((err) => console.log("err", err));
}