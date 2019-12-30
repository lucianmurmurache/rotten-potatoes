import React from 'react';
//import PropTypes from 'prop-types';
import './genre-view.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
//import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
/* =============react-bootstrap-imports=============*/

//import axios from 'axios';

export class GenreView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { genre } = this.props;

        return (
            <div className="genre-view">
                <div className="genre-title">
                    <h1>{genre.name}</h1>
                </div>
                <div className="genre-description">
                    Description: {genre.description}
                </div>
                <Link to={'/'}>
                    <Button variant="dark" className="btn">
                        Back
                    </Button>
                </Link>
            </div>
        )
    }
}

/*=================PropTypes=================*/
//GenreView.propTypes = {
//   no props yet!
//};
/*=================PropTypes=================*/