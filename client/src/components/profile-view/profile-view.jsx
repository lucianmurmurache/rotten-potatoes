import React from 'react';
import './profile-view.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

import axios from 'axios';

//Extract data with mapStateToProps passed to connect
const mapStateToProps = state => {
    const { movies } = state;
    return { movies };
}

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: null,
            username: null,
            password: null,
            email: null,
            birthday: null,
            favourites: [],
            usernameNew: null,
            passwordNew: null,
            emailNew: null,
            birthdayNew: null
        };
    }

    getUserProfile(token) {
        let username = localStorage.getItem('user');
        axios.get('https://rotten-potatoes3000.herokuapp.com/user/${username}', {
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then((response) => {
                this.setState({
                    userData: response.data,
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

    deleteUserProfile(event) {
        event.preventDefault();
        let username = localStorage.getItem('user');
        axios.delete('https://rotten-potatoes3000.herokuapp.com/user/${username}', {
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then(response => {
                console.log('User account deleted.');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/client', '_self');
            })
            .catch(function (error) {
                console.log('Unable to delete user account: ' + error);
            });
    }

    deleteFavouriteMovie(event, movieID) {
        event.preventDefault();
        console.log('Deleting ' + movieID);
        axios.delete('https://rotten-potatoes3000.herokuapp.com/user/${username}/movies/${movieID}', {
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then(response => {
                this.getUserProfile(localStorage.getItem('token'));
            })
            .catch(function (error) {
                console.log('Unable to delete movie: ' + error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUserProfile(accessToken);
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleProfileUpdate(event) {
        event.preventDefault();
        let username = localStorage.getItem('user');
        axios.put('https://rotten-potatoes3000.herokuapp.com/user/${username}', {
            username: this.state.usernameNew,
            password: this.state.passwordNew,
            email: this.state.emailNew,
            birthday: this.state.birthdayNew
        }, {
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then(response => {
                console.log('User data has been successfuly updated.');
                localStorage.setItem('user', this.state.usernameNew);
            })
            .catch(function (error) {
                console.log('Unable to update user profile: ' + error);
            });
    }

    render() {
        const { username, email, birthday, favourites } = this.state;
        const { movies } = this.props;

        return (
            <Card className="profile-view">
                <Card.Body>
                    <Card.Title>Profile</Card.Title>
                    <Card.Text className="profile-username">Username: {username}</Card.Text>
                    <Card.Text className="profile-password">Password: #h#a#s#h#e#d#</Card.Text>
                    <Card.Text className="profile-email">Email: {email}</Card.Text>
                    <Card.Text className="profile-birthday">Birthday: {birthday}</Card.Text>
                    <Card.Text className="profile-favourites">Favorites: {favourites}</Card.Text>
                    <Button
                        variant="-outline-danger"
                        size="sm"
                        onClick={event => this.deleteFavouriteMovie(event, movieID._id)}
                    >
                        Delete movie
                    </Button>
                </Card.Body>

                <Link to={'/'}>
                    <Button variant="outline-dark" className="btn">
                        Back to movie list
                    </Button>
                </Link>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(ProfileView);

/*
    ====================BUTTONS====================
    <div>
            <Link to={'/user/${username}'}>
                <Button
                    className="profile-button"
                    variant="outline-primary"
                >
                    Profile
                </Button>
            </Link>
            <Button
                className="logout-button"
                variant="outline-primary"
                onClick={() => this.onLogout()}
            >
                Logout
            </Button>
    </div>
    ====================BUTTONS====================
*/