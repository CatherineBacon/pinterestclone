import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import { Pictures } from '../api/pictures.js';

import Home from './pages/Home.jsx';
import MyPictures from './pages/MyPictures.jsx';
import Picture from './components/Picture.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <Grid className="container">
          <Route exact path="/" component={Home} />
          <Route path="/user/:userId" component={MyPictures} />
        </Grid>
      </Router>
    );
  }
}

App.propTypes = {
  pictures: PropTypes.array.isRequired
};

export default createContainer(
  () => {
    return {
      pictures: Pictures.find({}).fetch()
    };
  },
  App
);
