import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, PageHeader } from 'react-bootstrap';

import { Pictures } from '../../api/pictures';

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
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default createContainer(
  () => {
    // add Meteor subscibe all pictures (latest x, then infinite scroll)
    return {
      pictures: Pictures.find({}).fetch(),
    };
  },
  Home,
);
