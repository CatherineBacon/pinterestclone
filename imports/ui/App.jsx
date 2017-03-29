import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import Picture from './Picture.jsx';

export default class App extends Component {
  getPictures() {
    return [
      { _id: 1, url: 'http://placehold.it/350x150' },
      { _id: 2, url: 'http://placehold.it/140x100' },
      { _id: 3, url: 'http://placehold.it/200x150' }
    ];
  }

  renderPictures() {
    return this.getPictures().map(picture => (
      <Picture key={picture._id} picture={picture} />
    ));
  }

  render() {
    return (
      <Grid className="container">
        <Row>
          <Col>
            <PageHeader>Pictures</PageHeader>
          </Col>
        </Row>

        <Row>
          <Col>

            {this.renderPictures()}

          </Col>
        </Row>
      </Grid>
    );
  }
}
