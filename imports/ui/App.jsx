import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Grid, Row } from 'react-bootstrap';

import Home from './pages/Home.jsx';
import MyPictures from './pages/MyPictures.jsx';
import Menu from './components/Menu.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Grid className="container">
          <Row>
            <Menu user={Meteor.userId()} />
          </Row>
          <Route exact path="/" component={Home} />
          <Route path="/user/:userId" component={MyPictures} />
        </Grid>
      </Router>
    );
  }
}
