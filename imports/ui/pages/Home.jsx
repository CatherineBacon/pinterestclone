import React, { Component, PropTypes } from 'react';
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
          <PageHeader>Pictures</PageHeader>
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

export default createContainer(
  // add Meteor subscibe all pictures latest x, then infinite scroll
  () => {
    const canLoadMore = limit.get() < Pictures.find({}).count();

    return {
      pictures: Pictures.find({}, { limit: limit.get() }).fetch(),
      loadMore: () => limit.set(limit.get() + 1),
      canLoadMore,
    };
  },
  Home,
);
