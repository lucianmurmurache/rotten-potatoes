import React from 'react';

export class MoviesCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (<div className="movie-card">{movie.title}</div>)
    }
}