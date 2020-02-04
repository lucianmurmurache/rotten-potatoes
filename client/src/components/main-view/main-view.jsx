import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import './main-view.scss'

/* =============react-bootstrap-imports=============*/
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
/* =============react-bootstrap-imports=============*/

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { RouterLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setMovies, setLoggedInUser } from '../../actions/actions';

import { RegistrationView } from '../registartion-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-view/profile-update';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list';


export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            user: null,
            email: "",
            birthday: "",
            movies: [],
            userInfo: {}
        };
    }

    getMovies(token) {
        axios.get('https://rotten-potatoes3000.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
                localStorage.setItem('movies', JSON.stringify(response.data));
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                alert('An error occured, unable to get movies!' + error);
            });
    }

    getUserProfile(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://rotten-potatoes3000.herokuapp.com/user/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    userInfo: response.data,
                });
                this.props.setLoggedInUser(response.data);
            })
            .catch(function (error) {
                alert('An error occured when getting the profile data!' + error);
            });
    }

    updateUserProfile(data) {
        this.setState({
            userInfo: data
        });
        localStorage.setItem('user', data.username);
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUserProfile(accessToken);
        }
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.username
        });
        localStorage.setItem('user', authData.user.username);
        localStorage.setItem('token', authData.token);
        this.getMovies(authData.token);
        this.getUserProfile(authData.token);
        this.setState({
            userInfo: authData.user
        });
    }

    onLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('movies');
        this.setState({
            user: null
        });
        window.open('/client', '_self');
    }

    render() {
        const { movies, user, userInfo, token } = this.state;

        if (!movies) return <div className="main-view" />;

        if (!user) {
            return (
                <Router basename="/client">
                    <div className="main-view">
                        <Route
                            exact path="/"
                            render={() => <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />}
                        />
                        <Route
                            path="/register"
                            render={() => <RegistrationView />}
                        />
                    </div>
                </Router >
            );
        } else {
            return (
                <Router basename="/client">
                    <Navbar sticky="top" bg="light" expand="lg" className="shadow p-2">
                        <Navbar.Brand href="https://rotten-potatoes3000.herokuapp.com/client/" className="navbar-brand navbar-title">RottenPotatoes</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                            <Link component={RouterLink} to={`/user/${user}`} >
                                <Button
                                    variant="outline-dark"
                                    size="md"
                                    className="profile-button"
                                >
                                    Profile
                                </Button>
                            </Link>
                            <Button
                                variant="outline-dark"
                                size="md"
                                className="logout-button"
                                onClick={() => this.onLogout()}
                            >
                                Log out
                            </Button>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="main-view">
                        <Container className="container-fluid">
                            <Row>
                                <Route
                                    exact path="/"
                                    render={() => <MoviesList movies={movies} />}
                                />

                                <Route
                                    exact path="/movies/:movieID"
                                    render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieID)} />}
                                />

                                <Route
                                    exact path="/directors/:name"
                                    render={({ match }) => {
                                        if (!movies || movies.length === 0) return <div className="main-view" />;
                                        return <DirectorView director={movies.find(m => m.director.name === match.params.name).director} movies={movies} />
                                    }}
                                />

                                <Route
                                    exact path="/genres/:name"
                                    render={({ match }) => {
                                        if (!movies || movies.length === 0) return <div className="main-view" />;
                                        return <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} movies={movies} />
                                    }}
                                />

                                <Route
                                    path="/user/:username"
                                    render={() => {
                                        return <ProfileView userInfo={userInfo} />
                                    }}
                                />

                                <Route
                                    path="/update/:username"
                                    render={() => (<ProfileUpdate user={user} userInfo={userInfo} token={token} updateUserProfile={data => this.updateUserProfile(data)} />
                                    )}
                                />

                            </Row>
                        </Container>
                    </div>
                </Router>
            );
        }
    }
}

let mapStateToProps = state => {
    return { movies: state.movies, loggedInUser: state.loggedInUser }
}

const mapDispatchToProps = {
    setMovies,
    setLoggedInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);