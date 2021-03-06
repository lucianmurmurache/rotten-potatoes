import React from 'react';
import './genre-view.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* =============react-bootstrap-imports=============*/
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

/**
 * Genre information view - renders the genre description and a list of movies of this genre that
 * are available in the database.
 * @function GenreView
 * @param {string} props - genre, movies
 * @returns {GenreView}
 */

export class GenreView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { genre, movies } = this.props;

        if (!genre) return null;

        return (
            <div className="view">
                <Container fluid>
                    <Card className="genre-view">
                        <Card.Body>
                            <Card.Title className="genre-title">
                                {genre.name}
                            </Card.Title>
                            <Card.Text className="genre-description">
                                {genre.description}
                            </Card.Text>
                            <Link to={'/'}>
                                <Button
                                    variant="outline-dark"
                                    className="genre-back-button"
                                >
                                    Back to list
                            </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    <br></br><br></br>
                    <Container fluid>
                        <h2>Movies of {genre.name} genre</h2><br></br>
                        <div className="row">
                            {movies.map(movie => {
                                if (movie.genre.name === genre.name) {
                                    return (
                                        <div key={movie._id} className="genre-movies">
                                            <Card className="movie-card">
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Card.Img variant="top" src={movie.imagePath} />
                                                </Link>
                                                <Card.Body>
                                                    <Link className="genre-movie-title" to={`/movies/${movie._id}`}>
                                                        <Card.Title>{movie.title}</Card.Title>
                                                    </Link>
                                                    <Card.Text>{movie.description.substring(0, 100)}...</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </Container>
                </Container>
            </div>
        )
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string
    }).isRequired
};