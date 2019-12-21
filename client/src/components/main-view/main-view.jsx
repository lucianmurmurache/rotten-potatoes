import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registartion-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://rotten-potatoes3000.herokuapp.com/movies')
            .then((response) => {
                //Assign result to state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // Access single movie data
    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }
    /*
        //Return button
        onReturnClick() {
            this.setState({
                selectedMovie: null
            });
        }
    */
    //Login
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authDta.Token);
    }

    getMovies(token) {
        axios.get('https://rotten-potatoes3000.herokuapp.com/movies', {
            headers: { Authorization: 'Brearer ${token}' }
        })
            .then((response) => {
                // Assign result to state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onClick={button => this.onReturnClick()} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))
                }
            </div>
        );
    }
}