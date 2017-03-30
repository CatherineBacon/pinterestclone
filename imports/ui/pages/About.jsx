import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, PageHeader } from 'react-bootstrap';

export default class About extends Component {
  render() {
    return (
      <Row>
        <Col>
          <PageHeader>About</PageHeader>
        </Col>
        <Col>
          <p>content</p>
        </Col>
      </Row>
    );
  }
}
