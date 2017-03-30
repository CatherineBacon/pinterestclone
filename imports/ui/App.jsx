import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import Home from './pages/Home.jsx';
import MyPictures from './pages/MyPictures.jsx';
import AccountsUIWrapper from './components/AccountsUIWrapper';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Grid className="container">
          <AccountsUIWrapper />
          <Route exact path="/" component={Home} />
          <Route path="/user/:userId" component={MyPictures} />
        </Grid>
      </Router>
    );
  }
}
