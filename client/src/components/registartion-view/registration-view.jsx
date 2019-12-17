import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* 
            Send request to server for authentication 
            and then call props.onLoggedIn(username)
        */
        props.onLoggedIn(username);
    };


    return (
        <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                    Username:
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                    Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    />
                </Form.Label>
                <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Sign in</Button>
                </Col>
            </Form.Group>
        </Form>
    )
}