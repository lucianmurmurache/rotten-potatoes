import React from 'react';
import './genre-view.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

export class GenreView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { genre } = this.props;
        if (!genre) return null;

        return (
            <Card className="genre-view">
                <Card.Body>
                    <Card.Title className="genre-title">
                        {genre.name}
                    </Card.Title>
                    <Card.Text className="genre-description">
                        {genre.description}
                    </Card.Text>
                    <Link to={'/'}>
                        <Button variant="outline-dark" className="btn">
                            Back to list
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}