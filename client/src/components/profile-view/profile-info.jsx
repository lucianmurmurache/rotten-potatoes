import React from 'react';
import './profile-info.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
/* =============react-bootstrap-imports=============*/

export class ProfileInfo extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {

        const { user, movies } = this.props;
        const favouritesList = movies.filter(movie => user.favourites.includes(movie._id));
        console.log(favouritesList);

        return (
            <div className="profile-info">
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title className="profile-info-title">Profile Info</Card.Title>
                            <ListGroup className="list-group-flush" variant="flush">
                                <ListGroup.Item>Username: {user.username}</ListGroup.Item>
                                <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                                <ListGroup.Item>Birthday: {user.birthday && birthday.slice(0, 10)}</ListGroup.Item>
                                <ListGroup.Item>Favorites:
                                    <div>
                                        {user.favourites.length === 0 && <p>No movies added yet.</p>}
                                        {user.favourites.length > 0 &&
                                            <ListGroup>
                                                {favouritesList.map(movie => (
                                                    <li key={movie._id} variant="flush">
                                                        <span className="d-flex align-items-center">
                                                            <Link to={`/movies/${movie._id}`}>
                                                                <h4 className="link movie-acccess">
                                                                    {movie.title}
                                                                </h4>
                                                            </Link>
                                                        </span>
                                                    </li>
                                                ))}
                                            </ListGroup>
                                        }
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Form>
                            <Link to={'/'}>
                                <Button
                                    variant="outline-dark"
                                    className="profile-return-button"
                                >
                                    Back to movie list
                                </Button>

                            </Link>
                            <Form.Label className="delete-profile-title">Delete account</Form.Label><br></br>
                            <small>
                                *Should you decide to delete your profile, please be aware that once you do,
                                your data will be deleted without any backup! It is not possible to revert this action!
                            </small>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                className="delete-profile-button"
                                onClick={() => this.deleteUserProfile()}
                            >
                                Delete Profile
                            </Button>
                        </Form>
                    </Card >
                </Container>
            </div>

        )
    }
}

/*
export function ProfileInfo() {
    const { user, movies } = this.props;
    const favouritesList = movies.filter(movie => user.favourites.includes(movie._id));
    console.log(favouritesList);

    if (!user || !movies) return <div>
        <Spinner className="loading-spinner" animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>;

    return (
        <div className="profile-info">
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title className="profile-info-title">Profile Info</Card.Title>
                        <ListGroup className="list-group-flush" variant="flush">
                            <ListGroup.Item>Username: {user.username}</ListGroup.Item>
                            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                            <ListGroup.Item>Birthday: {user.birthday && birthday.slice(0, 10)}</ListGroup.Item>
                            <ListGroup.Item>Favorites:
                                <div>
                                    {user.favourites.length === 0 && <p>No movies added yet.</p>}
                                    {user.favourites.length > 0 &&
                                        <ListGroup>
                                            {favouritesList.map(movie => (
                                                <li key={movie._id} variant="flush">
                                                    <span className="d-flex align-items-center">
                                                        <Link to={`/movies/${movie._id}`}>
                                                            <h4 className="link movie-acccess">
                                                                {movie.title}
                                                            </h4>
                                                        </Link>
                                                    </span>
                                                </li>
                                            ))}
                                        </ListGroup>
                                    }
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                <Card>
                    <Form>
                        <Link to={'/'}>
                            <Button
                                variant="outline-dark"
                                className="profile-return-button"
                            >
                                Back to movie list
                                </Button>

                        </Link>
                        <Form.Label className="delete-profile-title">Delete account</Form.Label><br></br>
                        <small>
                            *Should you decide to delete your profile, please be aware that once you do,
                            your data will be deleted without any backup! It is not possible to revert this action!
                            </small>
                        <Button
                            size="sm"
                            variant="outline-danger"
                            className="delete-profile-button"
                            onClick={() => this.deleteUserProfile()}
                        >
                            Delete Profile
                            </Button>
                    </Form>
                </Card >
            </Container>
        </div>

    )
}
*/