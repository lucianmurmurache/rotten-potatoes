import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export function LoginView(props) {
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
            <Form.Label column sm={2}>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Label>
            <Form.Label column sm={2}>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Label>
            <Form.Group as={Row} controlId="formHorizontalCheck">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Form.Check label="Remember me" />
                </Col>
            </Form.Group>
            <Button type="button" onClick={handleSubmit}>Submit</Button>
        </Form>
    );
}