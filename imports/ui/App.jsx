import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';

import Home from './pages/Home.jsx';
import MyPictures from './pages/MyPictures.jsx';
import Menu from './components/Menu.jsx';
import About from './pages/About.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Grid className="container">
          <Row>
            <Route render={({ history }) => <Menu history={history} />} />
          </Row>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/user/:userId" component={MyPictures} />
        </Grid>
      </Router>
    );
  }
}
