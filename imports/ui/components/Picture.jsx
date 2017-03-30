import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { Thumbnail, Glyphicon, Button } from 'react-bootstrap';

import './Picture.css';

export default class Picture extends Component {
  constructor(props) {
    super(props);

    this.deletePicture = this._deletePicture.bind(this);
    this.likePicture = this._likePicture.bind(this);
  }

  addDefaultSrc(event) {
    const image = event.target;
    image.src = '/img/image_not_found.png';
  }

  _deletePicture() {
    Meteor.call(
      'pictures.remove',
      this.props.picture._id,
      this.props.picture.owner,
    );
  }

  _likePicture() {
    Meteor.call('pictures.like', this.props.picture);
  }

  render() {
    const showDelete = Meteor.userId() === this.props.picture.owner;
    const disableLikes = Meteor.userId() === this.props.picture.owner ||
      this.props.picture.likedBy.indexOf(Meteor.userId()) !== -1 ||
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
                onClick={this.deletePicture}
              >
                <Glyphicon glyph="trash" />
              </Button>
            </span>}
        </h4>
        <p>
          <Link to={`/user/${this.props.picture.owner}`}>OWNER</Link>
          {' '}
          <span className="pull-right">
            <Button
              bsStyle="link"
              onClick={this.likePicture}
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
