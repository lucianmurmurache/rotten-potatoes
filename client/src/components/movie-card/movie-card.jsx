import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <Card className="movie-card" bg="light">
                <Card.Img variant="top" src={movie.imagePath} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <Button
                        onClick={() => onClick(movie)}
                        variant="dark">Open
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth: PropTypes.string.isRequired
        }).isRequired,
        imagePath: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};