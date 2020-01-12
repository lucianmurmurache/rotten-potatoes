import React from 'react';
import './profile-view.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
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
        axios.get(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${token}` }
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

    deleteUserProfile() {
        axios.delete(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                alert('Do you really want to delete your account?')
            })
            .then(res => {
                console.log('User account deleted.');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log('Unable to delete user account: ' + error);
            });
    }

    deleteFavouriteMovie(movieID) {
        axios.delete(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}/movies/${movieID}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                this.getUserProfile(localStorage.getItem('token'));
            })
            .then(res => {
                console.log('Movie deleted frm favorites list');
                alert(`${movie.title} has been deleted from your favorites list`)
            })
            .catch(function (error) {
                console.log('Unable to delete movie: ' + error);
                alert(`Unable to delete ${movie.title} from your favourites list. Please refresh the page and try again!`)
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
        axios.put(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}`, {
            username: this.state.usernameNew,
            password: this.state.passwordNew,
            email: this.state.emailNew,
            birthday: this.state.birthdayNew
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(res => {
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

        if (!username || !movies) return <div>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>;


        return (
            <div className="profile">
                <Link to={'/'}>
                    <Button
                        variant="outline-dark"
                        className="return-button"
                    >
                        Back to movie list
                    </Button>
                </Link>
                <Card className="profile-view">
                    <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        <ListGroup className="list-group-flush" variant="flush">
                            <ListGroup.Item className="profile-username">Username: {username}</ListGroup.Item>
                            <ListGroup.Item className="profile-password">Password: -----------</ListGroup.Item>
                            <ListGroup.Item className="profile-email">Email: {email}</ListGroup.Item>
                            <ListGroup.Item className="profile-birthday">Birthday: {birthday}</ListGroup.Item>
                            <Button
                                variant="outline-danger"
                                className="delete-profile-button"
                                onClick={() => this.deleteUserProfile()}
                            >
                                Delete Profile
                            </Button>
                            <ListGroup.Item className="profile-favourites">Favorites:
                                <div>
                                    {favourites.length === 0 && <div>No movies added yet</div>}
                                    {favourites.length > 0 &&
                                        <ul>
                                            {favourites.map(movieID => (
                                                <li key={movieID}>
                                                    <p className="favourite-movies">
                                                        {movies.find(movie => movie._id === movieID).title}
                                                    </p>
                                                    <Link to={`/movies/${movieID}`}>
                                                        <Button size="sm" variant="outline-dark">Open</Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline-danger"
                                                        className="delete-button"
                                                        size="sm"
                                                        onClick={event => this.deleteFavouriteMovie(event, movieID._id)}
                                                    >
                                                        Delete movie
                                                    </Button>
                                                </li>)
                                            )}
                                        </ul>
                                    }
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                <br></br><br></br><br></br>
                <Accordion defaultActiveKey="0">
                    <Form className="update-profile">

                        <Form.Label className="update-profile__title">Update profile data</Form.Label>

                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a new username"
                                name="usernameNew"
                                autoComplete="off"
                                onChange={event => this.handleChange(event)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter a new password"
                                name="passwordNew"
                                autoComplete="off"
                                onChange={event => this.handleChange(event)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a new email"
                                name="emailNew"
                                onChange={event => this.handleChange(event)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="dd/mm/yyyy"
                                name="birthdayNew"
                                onChange={event => this.handleChange(event)}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Button
                            className="profile-update__btn"
                            vatiant="outline-dark"
                            type="button"
                            onClick={event => this.handleProfileUpdate(event)}
                        >
                            Update
                    </Button>
                    </Form>
                </Accordion>

            </div>
        );
    }
}


export default connect(mapStateToProps)(ProfileView);