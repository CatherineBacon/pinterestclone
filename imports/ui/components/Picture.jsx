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
    // only owner should be able to delete image
    Pictures.remove(this.props.picture._id);
  }

  likePicture() {
    // only non-owner shoud be able to like picture
    // only like once
    Pictures.update(this.props.picture._id, {
      $inc: { likes: 1 },
    });
  }

  render() {
    return (
      <Thumbnail
        onError={this.addDefaultSrc}
        src={this.props.picture.url}
        className="img-responsive picture"
      >
        <h4>
          {this.props.picture.title || 'test'}
          {' '}
          <span className="pull-right">
            <Button
              bsStyle="danger"
              bsSize="xsmall"
              onClick={this.deletePicture.bind(this)}
            >
              <Glyphicon glyph="trash" />
            </Button>
          </span>
        </h4>
        <p>
          OWNER
          {' '}
          <span className="pull-right">
            <Button bsStyle="link" onClick={this.likePicture.bind(this)}>
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
