import React, { useState, useEffect } from 'react';
import './profile-update.scss';

import axios from 'axios';
import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
/* =============react-bootstrap-imports=============*/

export function ProfileUpdate(props) {
    const {
        username: oldUsername,
        password: oldPassword,
        email: oldEmail,
        birthday: oldBirthday
    } = props.userInfo;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        setUsername(oldUsername);
        setPassword(oldPassword);
        setEmail(oldEmail);
        setBirthday(oldBirthday);
    }, [oldUsername, oldPassword, oldEmail, oldBirthday]);

    const user = props.user;

    const handleProfileUpdate = e => {
        e.preventDefault();
        const userInfo = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        };
        axios.put(`https://rotten-potatoes3000.herokuapp.com/user/${user}`,
            userInfo,
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                props.updateUserProfile(userInfo);
                alert('Your profile has been updated!');
                localStorage.setItem('user', response.data.username);
                window.open(`/user/${localStorage.getItem('user')}`, '_self');
            })
            .catch(function (error) {
                alert('An error occured, please refresh the page and try again!');
            })
    }

    const deleteUserProfile = e => {
        e.preventDefault();
        let username = localStorage.getItem('user');
        axios.delete(`https://rotten-potatoes3000.herokuapp.com/user/${username}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                confirm('Do you really want to delete your account?')
            })
            .then(res => {
                alert('User account deleted!');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                this.setState({
                    user: null
                });
                window.open('/', '_self');
            })
            .catch(function (error) {
                alert('An error occured during deletion, please refresh the page and try again!');
            });
    }

    return (
        <div className="profile-update">
            <div className="profile-update-return">
                <Link className="profile-update-return-link" to={`/user/${user}`}>
                    <Button
                        variant="outline-dark"
                        className="profile-update-return-button"
                    >
                        Back to profile
                </Button>
                </Link>
            </div><br></br>

            <Row>
                <Col>
                    <Container className="profile-update-container">
                        <Form className="profile-update-form">
                            <Form.Label className="update-profile-form-title">Update account</Form.Label><br></br>
                            <small className="profile-update-warning">
                                *Please ensure that you fill in all input fields prior to pressing "Update profile".
                                If you wish to keep some details as they are, fill in the current data again.
                            </small><br></br><br></br>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>
                                    Username
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete="on"
                                    placeholder="Enter new username"
                                    onChange={e => setUsername(event.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Enter new password"
                                    onChange={e => setPassword(event.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    autoComplete="on"
                                    placeholder="Enter new email"
                                    onChange={e => setEmail(event.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formBasicBirthday">
                                <Form.Label>
                                    Birthday
                                </Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    autoComplete="on"
                                    placeholder="dd/mm/yyyy"
                                    onChange={e => setBirthday(event.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Row className="profile-handle-update">
                                <Button
                                    className="profile-update-button"
                                    variant="outline-dark"
                                    onClick={handleProfileUpdate}
                                >
                                    Update profile
                                </Button><br></br><br></br>
                                <div className="delete-account">
                                    <Form.Label className="delete-profile-title">Delete account</Form.Label><br></br>
                                    <small>
                                        *Should you decide to delete your profile, please be aware that once you do,
                                        your data will be deleted without any backup! It is not possible to revert this action!
                                    </small><br></br>
                                    <Button
                                        size="sm"
                                        variant="outline-danger"
                                        className="delete-profile-button"
                                        onClick={deleteUserProfile}
                                    >
                                        Delete Profile
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}