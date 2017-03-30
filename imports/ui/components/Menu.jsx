import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Navbar, NavItem, Nav, Col } from 'react-bootstrap';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class Menu extends Component {
  handleSelect(eventKey, event) {
    event.preventDefault();

    this.props.history.push(eventKey);
  }

  render() {
    const myPictures = `/user/${this.props.userId}`;

    return (
      <Col>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Picture Board
            </Navbar.Brand>
          </Navbar.Header>
          <Nav onSelect={this.handleSelect.bind(this)}>
            <NavItem eventKey="/" href="#">Home</NavItem>
            <NavItem eventKey="/about" href="#">About</NavItem>
            {this.props.user &&
              <NavItem eventKey={myPictures} href="#">
                My Pictures
              </NavItem>}
          </Nav>
          <Nav pullRight>
            <NavItem>
              <AccountsUIWrapper />
            </NavItem>
          </Nav>
        </Navbar>
      </Col>
    );
  }
}

export default createContainer(
  () => {
    return {
      userId: Meteor.userId(),
      user: Meteor.user(),
    };
  },
  Menu,
);
