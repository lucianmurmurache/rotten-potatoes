import React from 'react';
import axios from 'axios';

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
            .then(response => {
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

    //Return button
    onReturnClick() {
        this.setState({
            selectedMovie: null
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={user => thisonLoggedIn(user)} />;

        if (!movies) return <div className="main-view" />; //If movie not loaded yet

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