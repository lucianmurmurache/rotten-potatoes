import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import CardDeck from 'react-bootstrap/CardDeck';
// import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Row>
                <Col xs={6} md={4}>
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
                </Col>
            </Row>
        );
    }
}

/*=================PropTypes=================*/
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
};
/*=================PropTypes=================*/