import React from 'react';
import './profile-view.scss';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import axios from 'axios';

/* =============react-bootstrap-imports=============*/
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: null,
            username: null,
            password: null,
            email: null,
            birthday: null,
            favourites: []
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUserProfile(accessToken);
        }
    }

    getUserProfile(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://rotten-potatoes3000.herokuapp.com/user/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
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
                alert('Unable to get profile data!' + error)
            });
    }

    deleteFavouriteMovie(event, favouriteMovie) {
        event.preventDefault();
        let username = localStorage.getItem('user');
        axios.delete(`https://rotten-potatoes3000.herokuapp.com/user/${username}/movies/${favouriteMovie}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                this.getUserProfile(localStorage.getItem('token'));
                alert('Movie deleted!');
            })
            .catch(function (error) {
                alert('Unable to delete movie, reload the page and try again!' + error);
            });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { username, email, birthday, favourites } = this.state;

        return (
            <div className="profile-view">
                <div className="update-profile-buttons">
                    <Link to={'/'}>
                        <Button
                            variant="outline-dark"
                            className="profile-view-return-button"
                        >
                            Back to movie list
                        </Button>
                    </Link>

                    <Link to={`/update/:username`}>
                        <Button
                            variant="outline-dark"
                            className="profile-view-update-button"
                        >
                            Update profile
                        </Button>
                    </Link>
                </div>

                <Card className="profile-view-card">
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <ListGroup className="list-group-flush" variant="flush">
                            <ListGroup.Item className="profile-username">Username: {username}</ListGroup.Item>
                            <ListGroup.Item className="profile-email">Email: {email}</ListGroup.Item>
                            <ListGroup.Item className="profile-birthday">Birthday:<span>{birthday && birthday.slice(0, 10)}</span></ListGroup.Item>
                            <ListGroup.Item className="profile-favourites">Favorites:
                                <div>
                                    {favourites.length === 0 && <p>No movies added yet.</p>}
                                    {favourites.length > 0 &&
                                        <ListGroup>
                                            {favourites.map(favouriteMovie => (
                                                <ListGroup.Item key={favouriteMovie}>
                                                    <p>
                                                        <Link to={`/movies/${favouriteMovie}`}>
                                                            {
                                                                JSON.parse(localStorage.getItem('movies')).find(
                                                                    movie => movie._id === favouriteMovie
                                                                ).title
                                                            }
                                                        </Link>
                                                        <Button
                                                            variant="outline-danger"
                                                            className="delete-movie-button"
                                                            size="sm"
                                                            onClick={e => this.deleteFavouriteMovie(event, favouriteMovie)}
                                                        >
                                                            Delete
                                                    </Button>
                                                    </p>
                                                </ListGroup.Item>)
                                            )}
                                        </ListGroup>
                                    }
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div >
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies, loggedInUser: state.loggedInUser }
}

export default connect(mapStateToProps)(ProfileView);