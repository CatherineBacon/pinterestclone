import React, { Component, PropTypes } from 'react';

export default class Picture extends Component {
  render() {
    return (
      <div className="picture">
        <img src={this.props.picture.url} /><p>test</p>
      </div>
    );
  }
}

Picture.propTypes = {
  picture: PropTypes.object.isRequired
};
