import React, { Component, PropTypes } from 'react';
import Masonry from 'react-masonry-component';

import Picture from './Picture.jsx';

export default class PictureGrid extends Component {
  render() {
    return (
      <Masonry>
        {this.props.pictures.map(picture => (
          <Picture key={picture._id} picture={picture} />
        ))}
      </Masonry>
    );
  }
}

PictureGrid.propTypes = {
  pictures: PropTypes.array.isRequired,
};
