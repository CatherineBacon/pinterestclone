import React, { Component, PropTypes } from 'react';
import { Thumbnail, Glyphicon, Button } from 'react-bootstrap';

import './Picture.css';

import { Pictures } from '../../api/pictures.js';

export default class Picture extends Component {
  addDefaultSrc(event) {
    const image = event.target;
    image.src = '/img/image_not_found.png';
  }

  deletePicture() {
    Meteor.call(
      'pictures.remove',
      this.props.picture._id,
      this.props.picture.owner,
    );
  }

  likePicture() {
    Meteor.call('pictures.like', this.props.picture);
  }

  render() {
    const showDelete = Meteor.userId() == this.props.picture.owner;
    const disableLikes = Meteor.userId() == this.props.picture.owner ||
      this.props.picture.likedBy.indexOf(Meteor.userId()) != -1 ||
      !Meteor.userId();

    return (
      <Thumbnail
        onError={this.addDefaultSrc}
        src={this.props.picture.url}
        className="img-responsive picture"
      >
        <h4>
          {this.props.picture.title || 'test'}
          {' '}
          {showDelete &&
            <span className="pull-right">
              <Button
                bsStyle="danger"
                bsSize="xsmall"
                onClick={this.deletePicture.bind(this)}
              >
                <Glyphicon glyph="trash" />
              </Button>
            </span>}
        </h4>
        <p>
          <a href={`/user/${this.props.picture.owner}`}>OWNER</a>
          {' '}
          <span className="pull-right">
            <Button
              bsStyle="link"
              onClick={this.likePicture.bind(this)}
              disabled={disableLikes}
            >
              <Glyphicon glyph="heart" />{' '}{this.props.picture.likes}
            </Button>
          </span>
        </p>
      </Thumbnail>
    );
  }
}

Picture.propTypes = {
  picture: PropTypes.object.isRequired,
};
