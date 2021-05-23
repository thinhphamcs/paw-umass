// Import
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Export it as a form so we can use it as props
export function HomeForm() {
    // Hook
    const [searchTerm, setSearchTerm] = useState({
        search: '',
    });

    // use history from react-router-dom to redirect
    const history = useHistory();

    // onChange function
    const onChange = (event) => {
        setSearchTerm({
            ...searchTerm,
            search: event.target.value
        });
    };

    const resetSubmit = () => {
        // axiosInstance().post("/user/reset-order").catch(err => { console.log(err); });
        // window.location.reload();
    }

    // Return this so we can use these as props on the UI (front end)
    return { error, data, imgPath, searchTerm, onChange, resetSubmit };
}