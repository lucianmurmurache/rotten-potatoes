import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './visibility-filter-input.scss';

/* =============react-bootstrap-imports=============*/
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
/* =============react-bootstrap-imports=============*/

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {

    return <Navbar fixed="top" bg="light" variant="light" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand href="#">
                RottenPotatoes
            </Navbar.Brand>
            <Form.Control className="visibility-filter"
                onChange={e => props.setFilter(e.target.value)}
                value={props.visibilityFilter}
                placeholder="Filter"
            />
        </Navbar.Collapse>
    </Navbar>;
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);