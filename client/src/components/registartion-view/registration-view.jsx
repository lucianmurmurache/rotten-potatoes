import React, { useState } from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';
import './registration-view.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('https://rotten-potatoes3000.herokuapp.com/user', {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        })
            .then((response) => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); // The argument '_self' is needed for the ppage to open in the current tab.
            })
            .catch((e) => {
                console.log('Unable to register user, try again.')
            });
    };


    return (
        <Form className="registration-form">
            <Form.Label className="registration-intro">Register</Form.Label>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>
                    Username
                    </Form.Label>
                <Form.Control type="text" value={username} placeholder="Set username (min 5 characters)" onChange={(e) => setUsername(e.target.value)} />

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type="password" value={password} placeholder="Set password (min 8 characters)" autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control type="text" value={email} placeholder="Enter email address (eg: abc@123.com)" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
                <Form.Label>
                    Birthday
                </Form.Label>
                <Form.Control type="date" value={birthday} placeholder="dd-mm-yyyy" onChange={(e) => setBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="dark" className="registration-button" type="submit" onClick={handleRegister}>
                Register
            </Button>
            <Form.Group controlId="formBasic">
                <Form.Text className="login-text">
                    Already have an account?
                </Form.Text>
                <Link to={'/'}>
                    <Button variant="link" className="login-button" type="link">Login</Button>
                </Link>
            </Form.Group>
        </Form>
    )
}

/*=================PropTypes=================*/
RegistrationView.propTypes = {
    // No props!
};
/*=================PropTypes=================*/