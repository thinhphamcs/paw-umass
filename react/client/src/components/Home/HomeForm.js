// Import
import { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from '../../helpers/axiosInstance';

// Export it as a form so we can use it as props
export function HomeForm() {
    // Hook
    const [searchTerm, setSearchTerm] = useState({
        search: '',
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // The variable that store image path
    const imgPath = process.env.REACT_APP_IMG_PATH;

    // Dispatch, need to understand this
    const { assetState: { assets: { error, data } } } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            if (data.auth) {
                history.push('/home');
            }
        }
        else {
            history.push('/user/submit');
        }
    }, [data, history]);

    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //     }
    // }, [error]);

    // onChange function
    const onChange = (event) => {
        setSearchTerm({
            ...searchTerm,
            search: event.target.value
        });
    };

    const resetSubmit = () => {
        axiosInstance().post("/user/reset-order").catch(err => { console.log(err); });
        window.location.reload();
    }

    // Return this so we can use these as props on the UI (front end)
    return { error, data, imgPath, searchTerm, onChange, resetSubmit };
}