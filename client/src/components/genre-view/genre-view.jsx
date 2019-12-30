import React from 'react';
//import PropTypes from 'prop-types';
import './genre-view.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

//import axios from 'axios';

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
                        Description: {genre.description}
                    </Card.Text>
                    <Link to={'/'}>
                        <Button variant="dark" className="btn">
                            Back
                    </Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}

/*=================PropTypes=================*/
//GenreView.propTypes = {
//   no props yet!
//};
/*=================PropTypes=================*/