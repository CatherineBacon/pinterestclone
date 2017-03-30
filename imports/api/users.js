import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.publish('userFromId', userId => {
    check(userId, String);

    return Meteor.users.find(
      { _id: userId },
      {
        fields: {
          'services.google.given_name': 1,
          'services.google.picture': 1,
        },
      },
    );
  });
}
