import React from 'react';
//import PropTypes from 'prop-types';
import './profile-view.scss';

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

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { profile } = this.props;

        return (
            <div className="profile-view">
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
//ProfileView.propTypes = {
//   no props yet!
//};
/*=================PropTypes=================*/