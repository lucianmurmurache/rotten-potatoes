import React from 'react';
import { connect } from 'react-redux';
import './visibility-filter-input.scss';

/* =============react-bootstrap-imports=============*/
import Form from 'react-bootstrap/Form';
/* =============react-bootstrap-imports=============*/

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {

    return <div className="visibility-filter-input">
        <Form.Group controlId="formBasicFilterInput">
            <Form.Control
                className="search"
                onChange={e => props.setFilter(e.target.value)}
                value={props.visibilityFilter}
                placeholder="Filter by name..."
            />
        </Form.Group>
    </div>
}

export default connect(
    null,
    { setFilter }
)(VisibilityFilterInput);