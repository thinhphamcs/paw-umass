// Import
// import { UserProfile } from "../../../components/Profile/UserProfile";
import { axiosInstance } from "../../../helpers/axiosInstance";
// import ProfileUI from '../../../layout/Profile/Profile';

// Using interceptor (response interceptor)
//<ProfileUI user={UserProfile(res)} />
export function GetProfiles(history) {
    axiosInstance(history)
        .get('http://localhost:5050/profile')
        .then((res) => console.log("hey the ", res))
        .catch((err) => console.log("err", err));
}