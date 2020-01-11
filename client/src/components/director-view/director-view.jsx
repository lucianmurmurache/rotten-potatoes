import React from 'react';
import './director-view.scss';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

export class DirectorView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { director, movies } = this.props;
        console.log(director);
        console.log(movies);

        if (!director) return null;

        return (
            <div className="view">
                <Card className="director-view">
                    <Card.Body>
                        <Card.Title className="director-title">
                            {director.name}
                        </Card.Title>
                        <Card.text className="director-birth">
                            Born in {director.birth}
                        </Card.text>
                        <Card.Text className="director-bio">
                            Biography: {director.bio}
                        </Card.Text>
                        <Link to={'/'}>
                            <Button
                                variant="outline-dark"
                                className="btn"
                            >
                                Back
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
                <Container>
                    <h2>Here are a few movies by {director.name}</h2>
                    <div className="row d-flex">
                        {movies.map(movie => {
                            if (movie.director.name === director.name) {
                                return (
                                    <div key={movie._id}>
                                        <Card className="director-movies">
                                            <Card.Img variant="top" src={movie.imagePath} />
                                            <Card.Body>
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Card.Title>{movie.title}</Card.Title>
                                                </Link>
                                                <Card.Text>{movie.description.substring(0, 100)}...</Card.Text>
                                            </Card.Body>
                                            <Card.Footer className="border-top-0">
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Button
                                                        variant="link"
                                                        className="pl-0"
                                                    >
                                                        Open movie
                                                    </Button>
                                                </Link>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </Container>
            </div>
        );
    }
}

DirectorView.propTypes = {
    director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        birth: PropTypes.string
    }).isReqired
};