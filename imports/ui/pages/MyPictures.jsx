import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, PageHeader, Button, Modal } from 'react-bootstrap';

import { Pictures } from '../../api/pictures.js';

import Picture from '../components/Picture.jsx';

class MyPictures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalTitle: '',
      modalUrl: ''
    };
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.modalTitle, this.state.modalUrl);
    this.setState({
      modalTitle: '',
      modalUrl: ''
    });
    this.closeModal();
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
              IMAGE
            </p>

            <hr />

            <form onSubmit={this.handleSubmit.bind(this)}>
              <label>
                Title
                <input
                  type="text"
                  value={this.state.modalTitle}
                  name="modalTitle"
                  onChange={this.handleChange.bind(this)}
                />
              </label>
              <br />
              <label>
                Source (http link)
                <input
                  type="url"
                  value={this.state.modalUrl}
                  name="modalUrl"
                  onChange={this.handleChange.bind(this)}
                />
              </label>
              <br />
              <Button type="submit">Add</Button>
            </form>

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
