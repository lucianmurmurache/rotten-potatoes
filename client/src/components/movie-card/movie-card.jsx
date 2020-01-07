import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
/* =============react-bootstrap-imports=============*/

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Col>
                <Card className="movie-card" bg="light">
                    <Card.Img variant="top" className="movie-poster" src={movie.imagePath} />
                    <Card.Title className="movie-title">{movie.title}</Card.Title>
                    <Card.Body>
                        <Card.Text className="movie-description">{movie.description}</Card.Text>
                    </Card.Body>
                    <Link to={`/movies/${movie._id}`}>
                        <Button
                            variant="outline-dark"
                            className="movie-button__open"
                            size="sm"
                        >
                            Open
                        </Button>
                    </Link>
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