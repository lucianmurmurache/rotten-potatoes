import React from 'react';
import PropTypes from 'prop-types';
import { PromiseProvider } from 'mongoose';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <div
                onClick={() => onClick(movie)}
                className="movie-card">{movie.title}
            </div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shapes({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired,
        director: PropTypes.shapes({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth: PropTypes.string.isRequired
        }).isRequired,
        imagePath: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};