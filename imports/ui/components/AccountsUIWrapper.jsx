import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class AccountsUIWrapper extends Component {
  componentDidMount() {
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container),
    );
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }
  render() {
    const { userId, user } = this.props;
    console.log(userId, user);
    return <span ref="container" />;
  }
}

export default createContainer(
  () => {
    return {
      userId: Meteor.userId(),
      user: Meteor.user(),
    };
  },
  AccountsUIWrapper,
);
