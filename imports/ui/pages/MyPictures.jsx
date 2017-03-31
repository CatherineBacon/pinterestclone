import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { _ } from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';
import { Row, Col, PageHeader } from 'react-bootstrap';

import { Pictures } from '../../api/pictures';

import PictureGrid from '../components/PictureGrid.jsx';
import AddPicture from '../components/AddPicture.jsx';

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

  loadMore(isVisible) {
    if (isVisible) this.props.loadMore();
  }

  render() {
    const urlUser = this.props.match.params.userId;
    const ownPage = urlUser === this.props.userId;
    const { owner, canLoadMore } = this.props;

    const ownerName = _.get(owner, 'services.google.given_name', 'This user');

    return (
      <Row>
        <Col>
          {ownPage
            ? <PageHeader>
                My Pictures
                <AddPicture />
              </PageHeader>
            : <PageHeader>{ownerName}'s Pictures</PageHeader>}
        </Col>

        <Col>

          <PictureGrid pictures={this.props.pictures} />

          <VisibilitySensor
            onChange={this.loadMore.bind(this)}
            offset={{ direction: 'bottom', value: -300 }}
            active={canLoadMore}
          />

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
const pictureCount = new ReactiveVar(0);

export default createContainer(
  props => {
    // Subscribe to pictures for viewed user
    const ownerId = props.match.params.userId;
    Meteor.subscribe('picturesByOwner', ownerId, limit.get());

    // Subsribe to user in url
    Meteor.subscribe('userFromId', ownerId);

    // Get number of pictures with owner=owner in database
    Meteor.call('pictures.countByOwner', ownerId, (error, count) => {
      if (error) return console.log(error);
      pictureCount.set(count);
    });

    const canLoadMore = limit.get() < pictureCount.get();

    return {
      pictures: Pictures.find(
        { owner: ownerId },
        { sort: { createdAt: -1 } },
      ).fetch(),
      loadMore: () => limit.set(limit.get() + 5),
      canLoadMore,
      user: Meteor.user(),
      userId: Meteor.userId(),
      owner: Meteor.users.findOne(ownerId),
    };
  },
  MyPictures,
);
