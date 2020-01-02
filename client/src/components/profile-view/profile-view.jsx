import React from 'react';
import './profile-view.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

import axios from 'axios';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favourites: []
        };
    }

    getUserProfile(token) {
        let username = localStorage.getItem('user');
        axios.get('https://rotten-potatoes3000.herokuapp.com/user/${username}', {
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then((response) => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    favourites: response.data.favourites
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteFavouriteMovie(e, movieID) {
        e.preventDefault();
        console.log('Deleting ' + movieID);
        axios.delete('https://rotten-potatoes3000.herokuapp.com/user/${username}/movies/${movieID}', {
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then((response) => {
                this.getUserProfile(localStorage.getItem('token'));
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getUserProfile(accessToken);
        }
    }

    render() {
        const { username, email, birthday, favourites } = this.state;

        return (
            <Card className="profile-view">
                <Card.Body>
                    <Card.Title>Profile</Card.Title>
                    <Card.Text className="profile-username">Username: {username}</Card.Text>
                    <Card.Text className="profile-email">Email: {email}</Card.Text>
                    <Card.Text className="profile-birthday">Birthday: {birthday}</Card.Text>
                    <Card.Text className="profile-favourites">Favorites: {favourites}</Card.Text>
                    <Button variant="danger" size="sm" onClick={(e) => this.deleteFavouriteMovie(movieID)}>Delete</Button>
                </Card.Body>

                <Link to={'/'}>
                    <Button variant="dark" className="btn">
                        Back to movie list
                    </Button>
                </Link>
            </Card>
        )
    }
}


/* WORK IN PROGRESS

   const handleUpdate = (e) => {
        e.preventDefault();
        axios.put('https://rotten-potatoes3000.herokuapp.com/user/${username}', {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        }, {
            headers: { Authorization: 'Bearer ${token}' }
        })
        .then((response) => {
            console.log('Your profile has been updated!')
        })
        .catch(function (error) {
                console.log('Unable to update profile: ' + error);
            })

    }

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete('https://rotten-potatoes3000.herokuapp.com/user/${username}', {
            headers: { Authorization: 'Bearer ${token}' }
        })
        .then((response) => {
            console.log('Account deleted');
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open('/' , '_self');
        })
        .catch(function (error) {
                console.log('Unable to delete profile: ' + error);
            })
    }

    ====================BUTTONS====================
    <Link to={'/user/${user}'}>
        <Button className="profile-button">Profile</Button>
    </Link>

    <Button variant="light" className="logout-button" onClick={() => this.onLogout()}>Logout</Button>
    ====================BUTTONS====================
*/