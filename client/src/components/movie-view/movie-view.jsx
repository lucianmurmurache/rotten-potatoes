import React from 'react';
import './movie-view.scss';
import axios from 'axios';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    addToFavourites(e) {
        const { movie } = this.props;
        e.preventDefault();
        axios.post(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}/movies/${movie._id}`, {
            username: localStorage.getItem('user')
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                console.log('movie added to favourite list.');
                alert(`${movie.title} has been added to your favorites list!`);
            })
            .then(res => {
                document.location.reload(true);
            })
            .catch(error => {
                console.log('Failed to add movie to list');
                alert(`Unable to add ${movie.title} to your favorites list!` + error)
            });
    }


    render() {
        const { movie } = this.props;
        console.log(this.props);

        if (!movie) return null;

        return (
            <div className="movie-view">
                <Card className="movie-view__card">
                    <Card.Img alt="movie-poster" variant="top" className="movie-poster" src={movie.imagePath} />
                    <Card.Body>

                        <Card.Title className="movie-title">
                            {movie.title}
                        </Card.Title>

                        <Card.Text className="movie-description">
                            {movie.description}
                        </Card.Text>

                        <Card.Text className="genre-name">Genre: </Card.Text>
                        <Link to={`/genres/${movie.genre.name}`}>
                            <Card.Text className="genre-name">{movie.genre.name}</Card.Text>
                        </Link>
                        <br></br>

                        <Card.Text className="director-name">Director: </Card.Text>
                        <Link to={`/directors/${movie.director.name}`}>
                            <Card.Text className="director-name">{movie.director.name}</Card.Text>
                        </Link>
                        <br></br>
                        <Button
                            variant="outline-primary"
                            className="add-favourite__button"
                            onClick={e => this.addToFavourites(e)}
                        >
                            Add to favorites
                        </Button>
                        <br></br>

                        <Link to={'/'}>
                            <Button variant="outline-dark" className="return-button">
                                Return to list
                            </Button>
                        </Link>

                    </Card.Body>
                </Card>
            </div >
        );
    }
}