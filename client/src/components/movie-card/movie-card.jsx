import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className="movie-card" bg="light">
                <Card.Img variant="top" src={movie.imagePath} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                    <Link to={'/movies/${movie._id'}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
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