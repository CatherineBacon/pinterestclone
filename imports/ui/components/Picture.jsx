import React, { Component, PropTypes } from 'react';
import { Thumbnail } from 'react-bootstrap';

import './Picture.css';

export default class Picture extends Component {
  static addDefaultSrc(event) {
    const image = event.target;
    image.src = 'http://placehold.it/300x300';
  }

  render() {
    return (
      <Thumbnail
        onError={this.addDefaultSrc}
        src={this.props.picture.url}
        className="img-responsive picture"
      >
        <h4>{this.props.picture.title || 'test'}</h4>
        <p>OWNER <span className="pull-right">LIKES OR DELETE</span></p>
      </Thumbnail>
    );
  }
}

Picture.propTypes = {
  picture: PropTypes.object.isRequired,
};
