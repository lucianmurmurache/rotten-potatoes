import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
/* =============react-bootstrap-imports=============*/

/**
 * The movie card renders the movie data, such as the movie title, image and a description of up to 100 characters.
 * @function MovieCard
 * @param {string} props - movie
 * @returns {MovieCard}
 */

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        if (!movie) return <div>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>;

        return (
            <Col>
                <Card className="movie-card" bg="light">
                    <Link className="movie-title-link" to={`/movies/${movie._id}`}>
                        <Card.Img variant="top" className="movie-poster" src={movie.imagePath} />
                    </Link>
                    <Link className="movie-title-link" to={`/movies/${movie._id}`}>
                        <Card.Title className="movie-title">{movie.title}</Card.Title>
                    </Link>
                    <Card.Body>
                        <Card.Text className="movie-description">{movie.description.substring(0, 110)}...</Card.Text>
                        <Link className="movie-title-link" to={`/movies/${movie._id}`}>
                            <Button
                                variant="outline-dark"
                                className="movie-open-button"
                                size="md"
                            >
                                Open
                        </Button>
                        </Link>
                    </Card.Body>
                </Card >
            </Col>
        );
    }
}

/*=================PropTypes=================*/
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        imagePath: PropTypes.string
    }).isRequired,
};
/*=================PropTypes=================*/