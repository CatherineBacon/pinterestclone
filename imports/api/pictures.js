import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Pictures = new Mongo.Collection('pictures');

if (Meteor.isServer) {
  Meteor.publish('pictures', limit => {
    return Pictures.find({}, { sort: { createdAt: -1 }, limit });
  });

  Meteor.publish('picturesByOwner', (owner, limit) => {
    check(owner, String);
    check(limit, Number);

    return Pictures.find({ owner }, { sort: { createdAt: -1 }, limit });
  });
}

Meteor.methods({
  'pictures.countAll'() {
    return Pictures.find().count();
  },

  'pictures.countByOwner'(owner) {
    check(owner, String);

    return Pictures.find({ owner }).count();
  },

  'pictures.insert'(url, title) {
    check(url, String);
    check(title, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    Pictures.insert({
      url,
      title,
      owner: this.userId,
      ownerImage: 'USERPIC', // Update with user information
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
    });
  },

  'pictures.remove'(pictureId, pictureOwner) {
    check(pictureId, String);
    check(pictureOwner, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorised');
    }

    if (Meteor.userId() !== pictureOwner) {
      throw new Meteor.Error('not-authorised');
    }

    Pictures.remove(pictureId);
  },

  'pictures.like'(picture) {
    check(picture, Object);

    const id = picture._id;
    const owner = picture.owner;
    const likedBy = picture.likedBy;

    if (Meteor.userId() === owner) {
      throw new Meteor.Error('not-authorised');
    }

    if (likedBy.indexOf(Meteor.userId()) !== -1) {
      throw new Meteor.Error('not-authorised');
    }

    Pictures.update(id, {
      $inc: { likes: 1 },
      $push: { likedBy: Meteor.userId() },
    });
  },
});
