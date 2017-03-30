import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Navbar, NavItem, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class Menu extends Component {
  render() {
    const myUrl = `/user/${this.props.userId}`;

    return (
      <Col>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Picture Board
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1}><Link to="/">Home</Link></NavItem>
            {this.props.user &&
              <NavItem eventKey={2}>
                <Link to={myUrl}>My Pictures</Link>
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
