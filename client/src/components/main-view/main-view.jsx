import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registartion-view/registration-view';


/* =============react-bootstrap-imports=============*/
//import Form from 'react-bootstrap/Form';
//import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

export class MainView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            user: null,
        };
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

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    //Return button
    onReturnClick() {
        this.setState({
            selectedMovie: null
        });
    }

    //Login with token
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
        const { movies, user } = this.state;

        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <div className="main-view">
                    <Container>
                        <Row>
                            <Route exact path="/" render={() => {
                                if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                                return movies.map(m => <MovieCard key={m._id} movie={m} />)
                            }} />
                            <Route path="/register" render={() => <RegistrationView />} />
                            <Route path="/movies/:movieID" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                            <Route path="/directors/:name" render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <DirectorView director={movies.find(m => m.directors.name === match.params.name).director} />
                            }} />
                            <Route path="/genres/:name" render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <GenreView genre={movies.find(m => m.genres.name === match.params.name).genre} />
                            }} />
                        </Row>
                    </Container>
                </div>
            </Router>
        );
    }
}
