import React from 'react';
import './director-view.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* =============react-bootstrap-imports=============*/
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

export class DirectorView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { director, movies } = this.props;
        if (!director) return null;

        return (
            <div className="director-div">
                <Container>
                    <Card className="director-view">
                        <Card.Body>
                            <Card.Title className="director-title">
                                {director.name}
                            </Card.Title>
                            <Card.Text className="director-bio">
                                {director.bio}
                            </Card.Text>
                            <Card.Text className="director-birth">
                                Born in {director.birth}
                            </Card.Text>
                            <Link to={'/'}>
                                <Button
                                    variant="outline-dark"
                                    className="director-back-button"
                                >
                                    Back to list
                            </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    <br></br><br></br>
                    <Container>
                        <h2>Movies of {director.name} director</h2><br></br>
                        <div className="row">
                            {movies.map(movie => {
                                if (movie.director.name === director.name) {
                                    return (
                                        <div key={movie._id} className="director-movies">
                                            <Card className="movie-card">
                                                <Card.Img variant="top" src={movie.imagePath} />
                                                <Card.Body>
                                                    <Link className="text-muted" to={`/movies/${movie._id}`}>
                                                        <Card.Title>{movie.title}</Card.Title>
                                                    </Link>
                                                    <Card.Text>{movie.description.substring(0, 100)}...</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </Container>
                </Container>
            </div>
        )
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        description: PropTypes.string,
        birth: PropTypes.string
    }).isRequired
};