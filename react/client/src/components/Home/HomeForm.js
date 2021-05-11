// Import
import { useState, useContext, useEffect } from 'react';
import { forgotChange } from '../../context/actions/auth/ForgotChange';
import { GlobalContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function HomeForm() {
    // Hook
    const [form, setForm] = useState({
        accept: '',
    });

    const [searchTerm, setSearchTerm] = useState({
        search: '',
    });

    // The variables for date function
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let finalDate;

    // use history from react-router-dom to redirect
    const history = useHistory();

    // The variable that store image path
    const imgPath = process.env.REACT_APP_IMG_PATH;

    // Dispatch, need to understand this
    const { assetDispatch, assetState: { assets: { loading, error, data } } } = useContext(GlobalContext);

    // useEffect so we can use history to redirect
    useEffect(() => {
        if (data) {
            // console.log(data);
        }
        else {
            history.push('/home');
        }
    }, [data, history]);

    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //     }
    // }, [error]);

    // onChange function
    const onChange = (event) => {
        setForm({
            ...form,
            accept: true
        });

        setSearchTerm({
            ...searchTerm,
            search: event.target.value
        });
    };

    // the Date function    
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    finalDate = year + "-" + month + "-" + day;


    // onSubmit function that will submit the form and the dispatch
    const onSubmit = () => {
        forgotChange(form)(assetDispatch); // change
    }

    // Return this so we can use these as props on the UI (front end)
    return { form, loading, error, data, finalDate, imgPath, searchTerm, onSubmit, onChange };
}