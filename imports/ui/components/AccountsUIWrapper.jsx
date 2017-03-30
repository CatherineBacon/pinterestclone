import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class AccountsUIWrapper extends Component {
  componentDidMount() {
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container)
    );
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
  render() {
    const { userId, user } = this.props;
    // Haven't tested but this should work - user might be undefined first but will then update
    console.log(userId, user);
    return <span ref="container" />;
  }
}

export default createContainer(
  () => {
    // Meteor.user() depends on a data subscription, so can be undefined at first
    // React doesn't know it's updated as it's a meteor thing, so you need to put
    // It in a container and pass as a prop, just like with the CollectionName.find() stuff
    return {
      userId: Meteor.userId(),
      user: Meteor.user(),
    };
  },
  AccountsUIWrapper
);
