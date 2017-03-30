import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Menu extends Component {
  render() {
    const myUrl = `/user/${this.props.user}`;

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
            <NavItem eventKey={2}><Link to={myUrl}>My Pictures</Link></NavItem>
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
