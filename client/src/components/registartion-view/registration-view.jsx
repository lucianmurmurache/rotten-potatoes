import React, { useState } from 'react';

/* =============react-bootstrap=============*/
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
/* =============react-bootstrap=============*/

import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, createUsername] = useState('');
    const [password, createPassword] = useState('');
    const [email, createEmail] = useState('');
    const [birthday, createBirthday] = useState('');


    const handleRegister = (e) => {
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


    return (
        <Row className="registration-row">
            <Form className="registration-form">
                <Form.Label className="registration-intro">User registration</Form.Label>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label column md={2}>
                        Username
                        <Form.Control type="text" value={username} placeholder="Enter Username" onChange={(e) => createUsername(e.target.value)} />
                    </Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label column md={2}>
                        Password
                        <Form.Control type="text" value={password} placeholder="Enter Password" onChange={(e) => createPassword(e.target.value)} />
                    </Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label column md={2}>
                        Email
                    <Form.Control type="text" value={email} placeholder="Enter email" onChange={(e) => createEmail(e.target.value)} />
                    </Form.Label>
                </Form.Group>

                <Form.Group controlId="formBasicBirthday">

                    <Form.Label column md={2}>
                        Birthday
                    <Form.Control type="text" value={birthday} placeholder="Enter Birthdate" onChange={(e) => createBirthday(e.target.value)} />
                    </Form.Label>
                </Form.Group>

                <Form.Group>
                    <Button variant="dark" className="registration-button" type="submit" onclick={handleRegister}>Register</Button>
                </Form.Group>
            </Form>
        </Row>
    )
}