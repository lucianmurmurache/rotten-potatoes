import React from 'react';
import './movie-view.scss';

import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
/* =============react-bootstrap-imports=============*/

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    addToFavourites(e) {
        const { movie } = this.props;
        e.preventDefault();
        axios.post(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}/movies/${movie._id}`, {
            username: localStorage.getItem('user')
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                alert(`${movie.title} has been added to your favorites list!`);
            })
            .catch(error => {
                alert(`Unable to add ${movie.title} to your favorites list!` + error)
            });
    }


    render() {
        const { movie } = this.props;
        if (!movie) return <div>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>;

        return (
            <div className="movie-view">
                <Card className="movie-view-card">
                    <Card.Img alt="movie-poster" variant="top" className="movie-poster" src={movie.imagePath} />
                    <Card.Body>

                        <Card.Title className="movie-title">
                            {movie.title}
                        </Card.Title>

                        <Card.Text className="movie-description">
                            {movie.description}
                        </Card.Text>

                        <Card.Text className="genre-name">Genre: </Card.Text>
                        <Link className="movie-view-link" to={`/genres/${movie.genre.name}`}>
                            <Card.Text className="genre-name">{movie.genre.name}</Card.Text>
                        </Link>
                        <br></br>

                        <Card.Text className="director-name">Director: </Card.Text>
                        <Link className="movie-view-link" to={`/directors/${movie.director.name}`}>
                            <Card.Text className="director-name">{movie.director.name}</Card.Text>
                        </Link>
                        <br></br><br></br>
                        <Button
                            size="sm"
                            variant="outline-primary"
                            className="add-favourite-button"
                            onClick={e => this.addToFavourites(e)}
                        >
                            Add to favorites
                        </Button>
                        <br></br><br></br>


                        <Link to={'/'}>
                            <Button
                                variant="outline-dark"
                                className="movie-view-return-button">
                                Return to list
                            </Button>
                        </Link>

                    </Card.Body>
                </Card>
            </div >
        );
    }
}

/*=================PropTypes=================*/

MovieView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        imagePath: PropTypes.string
    }).isRequired
}
/*=================PropTypes=================*/