import React from 'react';
import { connect } from 'react-redux';

import './movies-list.scss';

/* =============react-bootstrap-imports=============*/
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/* =============react-bootstrap-imports=============*/


import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

/**
 * A list of movies is rendered
 * @function MoviesList
 * @param {*} props 
 * @returns {MovieCard} - movies can be filtered by name via the search bar
 */
function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter));
    }

    if (!movies) return <div className="main-view" />

    return <div className="movies-list">
        <VisibilityFilterInput
            visibilityFilter={visibilityFilter} />
        <Container className="movies-list-container">
            <Row className="movies-list-row">
                {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
            </Row>
        </Container>
    </div>;
}

export default connect(mapStateToProps)(MoviesList);