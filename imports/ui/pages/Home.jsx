import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import { Pictures } from '../../api/pictures.js';

import Picture from '../components/Picture.jsx';

class Home extends Component {
  renderPictures() {
    return this.props.pictures.map(picture => (
      <Picture key={picture._id} picture={picture} />
    ));
  }

  render() {
    return (
      <Row>
        <Col>
          <PageHeader>Pictures</PageHeader>
        </Col>

        <Col>
          {this.renderPictures()}
        </Col>
      </Row>
    );
  }
}

Home.propTypes = {
  pictures: PropTypes.array.isRequired
};

export default createContainer(
  () => {
    return {
      pictures: Pictures.find({}).fetch()
    };
  },
  Home
);
