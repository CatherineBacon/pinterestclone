import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import { Row, Col, PageHeader, Button } from 'react-bootstrap';

import { Pictures } from '../../api/pictures';

import PictureGrid from '../components/PictureGrid.jsx';

class Home extends Component {
  loadMore(event) {
    event.preventDefault();
    this.props.loadMore();
  }

  render() {
    return (
      <Row>
        <Col>
          <PageHeader>All Pictures</PageHeader>
        </Col>

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

Home.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loadMore: PropTypes.func.isRequired,
  canLoadMore: PropTypes.bool.isRequired,
};

const limit = new ReactiveVar(10);
const pictureCount = new ReactiveVar(0);

export default createContainer(
  () => {
    Meteor.subscribe('pictures', limit.get());
    // add Meteor subscibe all pictures latest x, then infinite scroll

    Meteor.call('pictures.countAll', (error, count) => {
      if (error) return console.log(error);
      pictureCount.set(count);
    });
    const canLoadMore = limit.get() < pictureCount.get();

    return {
      pictures: Pictures.find({}, { sort: { createdAt: -1 } }).fetch(),
      loadMore: () => limit.set(limit.get() + 1),
      canLoadMore,
      userId: Meteor.userId(),
    };
  },
  Home,
);
