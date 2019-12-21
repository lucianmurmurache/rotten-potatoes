import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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
        <Form className="registration-form">
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
                <Button type="submit">Sign in</Button>
            </Form.Group>
        </Form>
    )
}