import React from 'react';
import './movie-view.scss';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

export class MovieView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view">
                <Card className="movie-view__card">
                    <Card.Img variant="top" className="movie-poster" src={movie.imagePath} />
                    <Card.Title className="movie-title">
                        {movie.title}
                    </Card.Title>
                    <Card.Text className="movie-description">
                        Description: {movie.description}
                    </Card.Text>
                    <Link to={'/genres/${movie.genre.name}'}>
                        <Button variant="link">Genre</Button>
                    </Link>
                    <Link to={'/directors/${movie.director.name}'}>
                        <Button variant="link">Director</Button>
                    </Link>
                    <Link to={'/'}>
                        <Button variant="dark" className="return-button">
                            Return to list
                        </Button>
                    </Link>
                </Card>
            </div >
        );
    }
}

/*=================PropTypes=================*/
MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string
    }).isRequired
};
/*=================PropTypes=================*/