import React from 'react';
//import PropTypes from 'prop-types';
import './director-view.scss';

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

export class DirectorView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { director } = this.props;
        if (!director) return null;

        return (
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
//DirectorView.propTypes = {
//   no props yet!
//};
/*=================PropTypes=================*/