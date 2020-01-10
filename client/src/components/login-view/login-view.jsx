import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

import axios from 'axios';

import './login-view.scss';
import WelcomeLogo from '../../img/rotten-potatoes-3000.png';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        /* Send request to server for authentication */
        axios.post('https://rotten-potatoes3000.herokuapp.com/login', {
            username: username,
            password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log(e, 'User not found.')
                alert('Username or password incorrect! Please try again.')
            });
    };

    return (
        <Container className="login-form">
            <div className="welcome-section">
                <img className="welcome-logo" src={WelcomeLogo} />
                <h2>Welcome to RottenPotatoes</h2>
            </div>
            <Form>
                <Form.Label className="login-intro">Login</Form.Label>

                <Form.Group controlId="formGroupUsername">
                    <Form.Label>
                        Username
                </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        autoComplete="on"
                        onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formGroupPassword">
                    <Form.Label>
                        Password
                </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        autoComplete="off"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button
                    className="login-button"
                    variant="outline-dark"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Login
            </Button>

                <Form.Group controlId="formGroupRegister">
                    <Form.Text className="register-text">Don´t have an account?</Form.Text>
                    <Link to={'/register'}>
                        <Button
                            variant="link"
                            className="register-button"
                            type="link"
                        >
                            Register
                    </Button>
                    </Link>
                </Form.Group>
            </Form>
        </Container>
    );
}

/*=================PropTypes=================*/
LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
};
/*=================PropTypes=================*/
