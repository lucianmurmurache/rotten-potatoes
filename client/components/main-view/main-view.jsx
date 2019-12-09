import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        axios.get('<https://rotten-potatoes3000.herokuapp.com/movies>') // This might require correction!('</movies>')
            .then(response => {
                //Assign result to state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies } = this.state;

        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {movies.map(movie => (
                    <div className="movie-card" key={movie._id}>{movie.title}</div>
                ))}
            </div>
        );
    }
}