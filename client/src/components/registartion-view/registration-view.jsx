import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './registration-view.scss';

/* =============react-bootstrap-imports=============*/
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://rotten-potatoes3000.herokuapp.com/login', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then((response) => {
                const data = response.data;
                console.log(data);
            })
            .catch((e) => {
                console.log('Unable to register user, try again.')
            });
    };


    return ( //Button to switch to login not finished!
        <Row className="registration-row">
            <Form className="registration-form">
                <Form.Label className="registration-intro">User registration</Form.Label>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label column md={2}>
                        Username
                        <Form.Control type="text" value={username} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label column md={2}>
                        Password
                        <Form.Control type="text" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label column md={2}>
                        Email
                    <Form.Control type="text" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicBirthday">

                    <Form.Label column md={2}>
                        Birthday
                    <Form.Control type="text" value={birthday} placeholder="Enter Birthdate" onChange={(e) => setBirthday(e.target.value)} />
                    </Form.Label>
                </Form.Group>

                <Form.Group>
                    <Button variant="dark" className="registration-button" type="submit" onclick={handleSubmit}>Register</Button>
                </Form.Group>
                <Form.Group>
                    <Form.Text>Already have an account?</Form.Text>
                    <Button variant="link" type="button" /*onclick={switchToLoginView}*/>Login</Button>
                </Form.Group>
            </Form>
        </Row>
    )
}

/*=================PropTypes=================*/
RegistrationView.propTypes = {
    onClick: PropTypes.func.isRequired,
    onUserRegister: PropTypes.func.isRequired
};
/*=================PropTypes=================*/