import React, { useState } from 'react';
import axios from 'axios';
import './registration-view.scss';
import WelcomeLogo from '../../img/rotten-potatoes-3000.png';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
/* =============react-bootstrap-imports=============*/


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    /**
     * Handles the data during the user registration process and sends the data to the database
     * @function handleRegister
     * @param {*} props 
     * @returns {alert} It alerts the user whether their registration was successful
     * @returns {LoginView} If the registration was successful, it redirects the user to the login view
     */
    const handleRegister = e => {
        e.preventDefault();
        axios.post('https://rotten-potatoes3000.herokuapp.com/user', {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        })
            .then((response) => {
                const data = response.data;
                alert('Registration completed successfully. You can now log in!');
                window.open('/client', '_self');
            })
            .catch(error => {
                alert('Unable to register, please try again. It is important to follow the recommendations in each field!' + error);
            });
    };


    return (
        <Form className="registration-form">
            <div className="welcome-section">
                <img className="welcome-logo" src={WelcomeLogo} />
                <h2>Welcome to RottenPotatoes</h2>
            </div>
            <Form.Label className="registration-intro">Register</Form.Label>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>
                    Username
                    </Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    placeholder="Set username (min. 5 characters)"
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    placeholder="Set password (min. 8 characters)"
                    autoComplete="off"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>
                    Email
                </Form.Label>
                <Form.Control
                    type="text"
                    value={email}
                    placeholder="Enter your email address (example: ex@ample.com)"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicBirthday">
                <Form.Label>
                    Birthday
                </Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    placeholder="dd-mm-yyyy"
                    onChange={e => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>

            <Button
                variant="outline-dark"
                className="registration-button"
                type="submit"
                onClick={handleRegister}
            >
                Register
            </Button>

            <Form.Group controlId="formBasic">
                <Form.Text className="login-text">
                    Already have an account?
                </Form.Text>
                <Link to={'/'}>
                    <Button
                        variant="link"
                        className="login-button"
                        type="link"
                    >
                        Login
                    </Button>
                </Link>
            </Form.Group>
        </Form>
    )
}