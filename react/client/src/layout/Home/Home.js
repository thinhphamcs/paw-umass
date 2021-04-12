// Import
import React from 'react';
import './Home.css';
import Nav from '../../../src/components/Nav/Nav';
import { Card, Button } from 'react-bootstrap';

// This will be the font end with props I can use to display data
function HomeUI({ form: { loading, error, data, finalDate, imgPath, onSubmit, onChange } }) {
    const handleUserLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
    }
    return (
        <>
            <Nav />
            <button onClick={handleUserLogout}> Log Out</button>

            <div className="container">
                <div className="row">
                    {data.asset ? data.asset.map((value, index) => (
                        <div className="col-sm-4">
                            <Card key={index}>
                                <Card.Img variant="top" src={imgPath + value.photo} />
                                <Card.Body>
                                    <Card.Text>
                                        <b>Name: {value.petName}</b>
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Age: {value.age}</b>
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Description: {value.description}</b>
                                    </Card.Text>
                                    <Card.Text>
                                        <b>Willing to give {value.howLong}</b>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Posted&nbsp;
                                            {finalDate.substr(8, 2) < value.date.substr(8, 2) ?
                                            [finalDate.substr(5, 2) < value.date.substr(5, 2) ?
                                                [(finalDate.substr(0, 4) - value.date.substr(0, 4)) === 0 ? "less than a year" : finalDate.substr(0, 4) - value.date.substr(0, 4) + " year(s) ago"] :
                                                [(finalDate.substr(5, 2) - value.date.substr(5, 2)) === 0 ? "less than a month" : finalDate.substr(5, 2) - value.date.substr(5, 2) + " month(s) ago"]] :
                                            [(finalDate.substr(8, 2) - value.date.substr(8, 2)) === 0 ? "less than a day" : finalDate.substr(8, 2) - value.date.substr(8, 2) + " day(s) ago"]}</small>
                                </Card.Footer >
                                <Button variant="primary">Take</Button>
                            </Card >
                        </div>
                    )) : null}
                </div>
            </div>
        </>
    );
}

export default HomeUI;

