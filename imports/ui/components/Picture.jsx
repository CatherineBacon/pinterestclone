import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'lodash';
import {
  Thumbnail,
  Glyphicon,
  Button,
  Image,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import './Picture.css';

class Picture extends Component {
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
    const { owner, picture } = this.props;

    const showDelete = Meteor.userId() === picture.owner;
    const disableLikes = Meteor.userId() === picture.owner ||
      picture.likedBy.indexOf(Meteor.userId()) !== -1 ||
      !Meteor.userId();

    const ownerName = _.get(owner, 'services.google.given_name', '');
    const ownerImage = _.get(
      owner,
      'services.google.picture',
      'http://placehold.it/100x100',
    );

    return (
      <Thumbnail
        onError={this.addDefaultSrc}
        src={picture.url}
        className="img-responsive picture"
      >
        <h4>
          {picture.title || 'test'}
        </h4>
        <div>
          <Link to={`/user/${picture.owner}`}>
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip">{ownerName}</Tooltip>}
            >

              <Image src={ownerImage} circle className="avatar pull-left" />

            </OverlayTrigger>
          </Link>

          <ButtonGroup className="pull-right">
            {showDelete &&
              <Button bsStyle="danger" onClick={this.deletePicture}>
                <Glyphicon glyph="trash" />
              </Button>}
            <Button
              bsStyle="info"
              onClick={this.likePicture}
              disabled={disableLikes}
            >
              <Glyphicon glyph="heart" />{' '}{picture.likes}
            </Button>
          </ButtonGroup>

        </div>
      </Thumbnail>
    );
  }
}

Picture.propTypes = {
  picture: PropTypes.object.isRequired,
};

export default createContainer(
  props => {
    Meteor.subscribe('userFromId', props.picture.owner);

    return {
      picture: props.picture,
      owner: Meteor.users.findOne(props.picture.owner),
    };
  },
  Picture,
);
