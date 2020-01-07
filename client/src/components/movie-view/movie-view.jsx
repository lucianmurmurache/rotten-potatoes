import React from 'react';
import './movie-view.scss';

import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }
    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view">
                <Card className="movie-view__card">
                    <Card.Img alt="movie-poster" variant="top" className="movie-poster" src={movie.imagePath} />
                    <Card.Body>
                        <Card.Title className="movie-title">
                            {movie.title}
                        </Card.Title>
                        <Card.Text className="movie-description">
                            Description: {movie.description}
                        </Card.Text>
                        <Link to={`/genres/${movie.genre.name}`}>
                            <Button variant="link">Genre</Button>
                        </Link>
                        <Link to={`/directors/${movie.director.name}`}>
                            <Button variant="link">Director</Button>
                        </Link>
                        <br></br>
                        <Link to={'/'}>
                            <Button variant="outline-dark" className="return-button">
                                Return to list
                        </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div >
        );
    }
}