import React from 'react';
import './movie-view.scss';
//import PropTypes from 'prop-types';

/* =============react-bootstrap-imports=============*/
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }
    render() {
        const { movie, onClick } = this.props;

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
                    <Card.Text className="movie-genre">
                        Genre: {movie.genre.name}
                    </Card.Text>
                    <Card.Text className="movie-director">
                        Director: {movie.director.name}
                    </Card.Text>
                    <Button variant="dark" onClick={() => onClick()} className="return-button">
                        Return to list
                </Button>
                </Card>
            </div >
        );
    }
}

/*=================PropTypes=================*/
//MovieView.propTypes = {
//    movie: PropTypes.func.isRequired,
//    onClick: PropTypes.func.isRequired
//};
/*=================PropTypes=================*/