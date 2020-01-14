import React, { useState } from 'react';
import './profile-form.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
/* =============react-bootstrap-imports=============*/

export class ProfileForm extends React.Component {
    constructor() {
        super();
    };

    render() {
        const [username, newUsername] = useState('');
        const [password, newPassword] = useState('');
        const [email, newEmail] = useState('');
        const [birthday, newBirthday] = useState('');

        return (
            <div className="profile-form">
                <Link to={'/'}>
                    <Button
                        variant="outline-dark"
                        className="profile-return-button"
                    >
                        Back to movie list
                    </Button>
                </Link>
                <br></br><br></br><br></br>
                <Card className="profile-form-card">
                    <Form className="update-profile-form">

                        <Form.Label className="update-profile-title">Update profile data</Form.Label><br></br>

                        <small className="warning">*Please ensure that you fill in all input fields prior to pressing Update.
                    If you wish to keep some details as they are, fill in the current data again.</small><br></br><br></br>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter a new username"
                                autoComplete="off"
                                onChange={event => newUsername(event.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter a new password"
                                autoComplete="off"
                                onChange={event => newPassword(event.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter a new email"
                                onChange={event => newEmail(event.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                placeholder="dd/mm/yyyy"
                                onChange={event => newBirthday(event.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button
                            className="update-profile-button"
                            vatiant="outline-dark"
                            type="button"
                            onClick={handleProfileUpdate}
                        >
                            Update profile
                </Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

/*
export function ProfileForm() {
    const [username, newUsername] = useState('');
    const [password, newPassword] = useState('');
    const [email, newEmail] = useState('');
    const [birthday, newBirthday] = useState('');

    return (
        <div className="profile-form">
            <Link to={'/'}>
                <Button
                    variant="outline-dark"
                    className="profile-return-button"
                >
                    Back to movie list
            </Button>
            </Link>
            <br></br><br></br><br></br>
            <Card className="profile-form-card">
                <Form className="update-profile-form">

                    <Form.Label className="update-profile-title">Update profile data</Form.Label><br></br>

                    <small className="warning">*Please ensure that you fill in all input fields prior to pressing Update.
                    If you wish to keep some details as they are, fill in the current data again.</small><br></br><br></br>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a new username"
                            autoComplete="off"
                            onChange={event => newUsername(event.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter a new password"
                            autoComplete="off"
                            onChange={event => newPassword(event.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter a new email"
                            onChange={event => newEmail(event.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formBasicBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="dd/mm/yyyy"
                            onChange={event => newBirthday(event.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button
                        className="update-profile-button"
                        vatiant="outline-dark"
                        type="button"
                        onClick={handleProfileUpdate}
                    >
                        Update profile
                </Button>
                </Form>
            </Card>
        </div>
    );
}
*/