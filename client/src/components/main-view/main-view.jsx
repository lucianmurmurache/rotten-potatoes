import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import './main-view.scss'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies, setLoggedInUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registartion-view/registration-view';


export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            user: null,
        };
    }

    getMovies(token) {
        axios.get('https://rotten-potatoes3000.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getUserProfile(token) {
        let username = localStorage.getItem('user')
        axios.get('https://rotten-potatoes3000.herokuapp.com/user/${username}', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setLoggedInUser(response.data);
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    //Login with token
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username
        });
        localStorage.setItem('user', authData.user.username);
        localStorage.setItem('token', authData.token);
        this.getMovies(authData.token);
    }

    onLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/client', '_self');
    }

    render() {

        let { movies } = this.props;
        let { user } = this.state;

        return (
            <Router basename="/client">
                <div className="main-view">
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                        return <MoviesList movies={movies} />;
                    }} />
                    <Route path="/register" render={() => <RegistrationView />} />

                    <Route path="/movies/:movieID" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieID)} />} />

                    <Route path="/directors/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <DirectorView director={movies.find(m => m.director.name === match.params.name)} />
                    }} />

                    <Route path="/genres/:name" render={({ match }) => {
                        if (!movies) return <div className="main-view" />;
                        return <GenreView genre={movies.find(m => m.genre.name === match.params.name)} />
                    }} />

                    <Route path="/user/:username" render={() => <ProfileView />} />
                </div>
            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies, setLoggedInUser })(MainView);