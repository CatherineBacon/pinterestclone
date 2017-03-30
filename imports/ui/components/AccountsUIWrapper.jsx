import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export default class AccountsUIWrapper extends Component {
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
    // this is the bit that doesn't work - userIF() prints, user() is undefined
    console.log(Meteor.userId());
    console.log(Meteor.user());
    return <span ref="container" />;
  }
}
