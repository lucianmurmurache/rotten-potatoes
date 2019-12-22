import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registartion-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

/* =============react-bootstrap-imports=============*/
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

export class MainView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
        };
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

    getMovies(token) {
        axios.get('https://rotten-potatoes3000.herokuapp.com/movies', {
            headers: { Authorization: 'Bearer ${token}' }
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

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.username);
        this.getMovies(authData.token);
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

        // RegistrationView goes here!

        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Container>
                    <Row>
                        {selectedMovie
                            ? <MovieView movie={selectedMovie} onClick={() => this.onReturnClick()} />
                            : movies.map(movie => (
                                <Col>
                                    <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}
