import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import {
  Row,
  Col,
  PageHeader,
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

import { Pictures } from '../../api/pictures';

import PictureGrid from '../components/PictureGrid.jsx';

class MyPictures extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalTitle: '',
      modalUrl: '',
    };

    this.openModal = this._openModal.bind(this);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    Meteor.call('pictures.insert', this.state.modalUrl, this.state.modalTitle);

    this.setState({
      modalTitle: '',
      modalUrl: '',
    });
    this.closeModal();
  }

  loadMore(event) {
    event.preventDefault();
    this.props.loadMore();
  }

  render() {
    const urlUser = this.props.match.params.userId;
    const ownPage = urlUser === this.props.userId;

    return (
      <Row>
        <Col>
          {ownPage
            ? <PageHeader>
                My Pictures <Button
                  className="pull-right"
                  bsStyle="primary"
                  bsSize="large"
                  onClick={this.openModal}
                >
                  Add a picture!
                </Button>
              </PageHeader>
            : <PageHeader>USERNAME's Pictures</PageHeader>}
        </Col>
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
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.modalTitle}
                  name="modalTitle"
                  onChange={this.handleChange.bind(this)}
                />

                <br />
                <ControlLabel>Source (http link)</ControlLabel>
                <FormControl
                  type="url"
                  value={this.state.modalUrl}
                  name="modalUrl"
                  onChange={this.handleChange.bind(this)}
                />

                <br />
                <Button type="submit">Add</Button>
              </FormGroup>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Col>

          <PictureGrid pictures={this.props.pictures} />

          <Button
            onClick={this.loadMore.bind(this)}
            disabled={!this.props.canLoadMore}
          >
            Load more
          </Button>

        </Col>
      </Row>
    );
  }
}

MyPictures.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loadMore: PropTypes.func.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

const limit = new ReactiveVar(10);

export default createContainer(
  () => {
    Meteor.subscribe('pictures');
    // subscribe to pictures from current user
    const canLoadMore = limit.get() < Pictures.find({}).count();

    return {
      pictures: Pictures.find(
        {},
        { limit: limit.get(), sort: { createdAt: -1 } },
      ).fetch(),
      loadMore: () => limit.set(limit.get() + 1),
      canLoadMore,
      user: Meteor.user(),
      userId: Meteor.userId(),
    };
  },
  MyPictures,
);
