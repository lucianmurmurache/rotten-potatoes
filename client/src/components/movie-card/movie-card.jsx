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
                    <Card.Img variant="top" className="movie-poster" src={movie.imagePath} />
                    <Card.Title className="movie-title">{movie.title}</Card.Title>
                    <Card.Body>
                        <Card.Text className="movie-description">{movie.description.substring(0, 110)}...</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
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