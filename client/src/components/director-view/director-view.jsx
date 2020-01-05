import React from 'react';
import './director-view.scss';

import { Link } from 'react-router-dom';

/* =============react-bootstrap-imports=============*/
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
/* =============react-bootstrap-imports=============*/

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
                        <Button variant="outline-dark" className="btn">
                            Back
                    </Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}