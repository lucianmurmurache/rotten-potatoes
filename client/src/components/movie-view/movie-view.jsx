import React from 'react';
import Button from 'react-bootstrap/Button';
import '../movie-view/movie-view.scss';

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
                <img className="movie-poster" src={movie.imagePath} />
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.genre.name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.director.name}</span>
                </div>
                <Button variant="dark" onClick={() => onClick()} className="return-button">
                    Return to list
                </Button>
            </div >
        );
    }
}