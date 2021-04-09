// Import
import React from 'react';
import './Home.css';
import Nav from '../../../src/components/Nav/Nav';
import { Card, CardDeck, Button } from 'react-bootstrap';

// This will be the font end with props I can use to display data
function HomeUI({ form: { loading, error, data, finalDate, imgPath, onSubmit, onChange } }) {
    const handleUserLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-block">
                                <h4 className="card-title">Card title</h4>
                                <p className="card-text">This is a longer card with supporting text.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-block">
                                <h4 className="card-title">Card title</h4>
                                <p className="card-text">This is a longer card with supporting text.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-block">
                                <h4 className="card-title">Card title</h4>
                                <p className="card-text">This is a longer card with supporting text.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-block">
                                <h4 className="card-title">Card title</h4>
                                <p className="card-text">This is a longer card with supporting text.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-block">
                                <h4 className="card-title">Card title</h4>
                                <p className="card-text">This is a longer card with supporting text.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-block">
                                <h4 className="card-title">Card title</h4>
                                <p className="card-text">This is a longer card with supporting text.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Nav />
            <button onClick={handleUserLogout}> Log Out</button>
            {/* <CardDeck>
                {data.asset ? data.asset.map((value, index) => (
                    <Card key={index}>
                        <Card.Img variant="top" src={imgPath + value.photo} />
                        <Card.Body>
                            <Card.Text>
                                Name: {value.petName}
                            </Card.Text>
                            <Card.Text>
                                Age: {value.age}
                            </Card.Text>
                            <Card.Text>
                                Description: {value.description}
                            </Card.Text>
                            <Card.Text>
                                Willing to give {value.howLong}
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
                        <Button variant="primary">Rent</Button>
                    </Card >
                )) : null}
            </CardDeck > */}
        </>
    );
}

export default HomeUI;

