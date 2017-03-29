import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, PageHeader, Button, Modal } from 'react-bootstrap';

import { Pictures } from '../../api/pictures.js';

import Picture from '../components/Picture.jsx';

class MyPictures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  closeModal() {
    console.log('Close...');
    this.setState({ showModal: false });
  }

  openModal() {
    console.log('open...');
    this.setState({ showModal: true });
  }

  renderPictures() {
    return this.props.pictures.map(picture => (
      <Picture key={picture._id} picture={picture} />
    ));
  }

  render() {
    return (
      <Row>
        <Col>
          <PageHeader>My Pictures</PageHeader>
        </Col>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.openModal.bind(this)}
        >
          Add a picture!
        </Button>

        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a picture!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <hr />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Col />

        <Col>
          {this.renderPictures()}
        </Col>
      </Row>
    );
  }
}

MyPictures.propTypes = {
  pictures: PropTypes.array.isRequired
};

export default createContainer(
  () => {
    return {
      pictures: Pictures.find({}).fetch()
    };
  },
  MyPictures
);
