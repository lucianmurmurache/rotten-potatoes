import React from 'react';
import './director-view.scss';

import { Link } from 'react-router-dom';

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
        const { director, movies, movie } = this.props;
        console.log(director);
        console.log(movies);

        if (!director) return null;
        // Render error between L25 and L47
        return (
            <div className="view">
                <Container>
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
                        </Card.Body>
                        <Link to={'/'}>
                            <Button
                                variant="outline-dark"
                                className="back-button"
                            >
                                Back
                            </Button>
                        </Link>
                    </Card>
                    <Container>
                        <h2>Here are a few movies by {director.name}</h2>
                        <div className="row">
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
                                            </Card>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </Container>
                </Container>
            </div>
        );
    }
}