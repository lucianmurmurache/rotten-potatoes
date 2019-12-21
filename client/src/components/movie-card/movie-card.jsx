import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <Card bg="light" style={{ width: '16rem' }}>
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
        title: PropTypes.string,
        description: PropTypes.string,
        genre: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string,
            birth: PropTypes.string
        }).isRequired,
        imagePath: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};