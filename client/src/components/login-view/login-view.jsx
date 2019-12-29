import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
/* =============react-bootstrap-imports=============*/

import axios from 'axios';
import './login-view.scss';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send request to server for authentication */
        axios.post('https://rotten-potatoes3000.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then((response) => {
                const authData = response.data;
                props.onLoggedIn(authData);
            })
            .catch((e) => {
                console.log('User not found! Please check your credentials.')
            });
    };

    return ( //Button to switch to register not finished!
        <Form className="login-form">
            <Form.Label className="login-intro">Login</Form.Label>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>
                    Username
                </Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} autoComplete="on" onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="login-button" variant="dark" type="submit" onClick={handleSubmit}>
                Login
            </Button>
            <Form.Group controlId="formBasic">
                <Form.Text className="register-text">Don´t have an account?</Form.Text>
                <Link to={'/register'}>
                    <Button variant="link" className="register-button" type="link">Register</Button>
                </Link>
            </Form.Group>
        </Form>
    );
}

/*=================PropTypes=================*/
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};
/*=================PropTypes=================*/