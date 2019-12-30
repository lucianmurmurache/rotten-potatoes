import React from 'react';
//import PropTypes from 'prop-types';
import './profile-view.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

import axios from 'axios';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: [],
            password: [],
            email: [],
            birthday: [],
            favourites: []
        };
    }

    getUserProfile(token) {
        let username = localStorage.getItem('user');
        axios.get('https://rotten-potatoes3000.herokuapp.com/user/:username', { // Might need correction: ${username}
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then((response) => {
                this.setState({
                    username: response.data.username,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    favourites: response.data.favourites
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    deleteFavouriteMovie(favouriteMovie) {
        console.log('Deleting: ', favouriteMovie);
        axios.delete('https://rotten-potatoes3000.herokuapp.com/user/:username/movies/${favouriteMovie}', { //URL may not be correct! -replace ":username" with "${username}".
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then((response) => {
                this.getUserProfile(('token')); // Might need correction: (localStorage.getItem('token'))
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            console.log('Access token found');
            this.getUserProfile(accessToken);
        }
    }

    render() {
        const { username, email, birthday, favourites } = this.props;

        return (
            <Card className="profile-view">
                <Card.Body>
                    <Card.Title>
                        Profile
                        </Card.Title>
                    <Card.Text>Username: {username}</Card.Text>
                    <Card.Text>Email: {email}</Card.Text>
                    <Card.Text>Birthday: {birthday}</Card.Text>
                    <Card.Text>Favorites: {favourites}
                        <Link>
                            <Button variant="dark" size="sm" onClick={this.deleteFavouriteMovie(favouriteMovie)}>
                                Delete
                            </Button>
                        </Link>
                    </Card.Text>
                    <Link to={'#'}>
                        <Button className="update-button">
                            Update profile
                        </Button>
                    </Link>
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

/*=================PropTypes=================*/
//ProfileView.propTypes = {
//   no props yet!
//};
/*=================PropTypes=================*/