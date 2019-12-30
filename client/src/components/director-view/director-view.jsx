import React from 'react';
//import PropTypes from 'prop-types';
import './director-view.scss';

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

export class DirectorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { director } = this.props;

        return (
            <div className="director-view">
                <div className="director-title">
                    <h1>{director.name}</h1>
                </div>
                <div className="director-bio">
                    Bio: {director.bio}
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
//DirectorView.propTypes = {
//   no props yet!
//};
/*=================PropTypes=================*/