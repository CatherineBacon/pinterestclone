import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  Image,
} from 'react-bootstrap';

import { Pictures } from '../../api/pictures';

export default class AddPicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalTitle: '',
      modalUrl: '',
      modalImage: '/img/insert_image_here.png',
    };

    this.openModal = this._openModal.bind(this);
    this.closeModal = this._closeModal.bind(this);
    this.handleChange = this._handleChange.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);

    this.handleImage = _.debounce(this._handleImage, 1000);
  }

  _closeModal() {
    this.setState({ showModal: false });
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    this.handleImage();
  }

  _handleImage() {
    const { modalUrl } = this.state;
    console.log(modalUrl);
    this.setState({ modalImage: modalUrl });
  }

  addDefaultSrc(event) {
    const image = event.target;
    image.src = '/img/image_not_found.png';
  }

  _handleSubmit(event) {
    event.preventDefault();

    Meteor.call('pictures.insert', this.state.modalUrl, this.state.modalTitle);

    this.setState({
      modalTitle: '',
      modalUrl: '',
    });
    this.closeModal();
  }

  render() {
    return (
      <span>
        <Button
          className="pull-right"
          bsStyle="primary"
          bsSize="large"
          onClick={this.openModal}
        >
          Add a picture!
        </Button>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Add a picture!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <Image
                  src={this.state.modalImage}
                  className="img-responsive center-block"
                  onError={this.addDefaultSrc}
                />
              </p>

              <hr />

              <FormGroup>
                <ControlLabel>Source (http link)</ControlLabel>
                <FormControl
                  type="url"
                  value={this.state.modalUrl}
                  name="modalUrl"
                  onChange={this.handleChange}
                />

                <br />

                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.modalTitle}
                  name="modalTitle"
                  onChange={this.handleChange}
                />
              </FormGroup>

            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Add</Button>
            </Modal.Footer>
          </form>
        </Modal>

      </span>
    );
  }
}
