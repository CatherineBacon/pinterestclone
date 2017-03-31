import React, { Component } from 'react';
import { Row, Col, PageHeader } from 'react-bootstrap';

export default class About extends Component {
  render() {
    return (
      <Row>
        <Col>
          <PageHeader>About</PageHeader>
        </Col>
        <Col>
          <p>
            This app was created as part of the following FreeCodeCamp challenge:
            {' '}
            <a
              href="https://www.freecodecamp.com/challenges/build-a-pinterest-clone"
            >
              https://www.freecodecamp.com/challenges/build-a-pinterest-clone
            </a>
          </p>
          <p>
            <strong>
              Final app:
              {' '}
              <a href="#">
                UPDATE
              </a>
            </strong>
          </p>
        </Col>
        <Col>
          <h3>Objective</h3>
          <p>
            Build a full stack JavaScript app that is functionally similar to
            {' '}
            <a href="https://midnight-dust.hyperdev.space">this</a>
            .
          </p>
          <h5>User Stories:</h5>
          <ul>
            <li>
              As an unauthenticated user, I can login with Twitter.
              {' '}
              <em>
                As I don't have a twitter account I've chose to login with Google
              </em>.
            </li>
            <li>As an authenticated user, I can link to images.</li>
            <li>
              As an authenticated user, I can delete images that I've linked to.
            </li>
            <li>
              As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
            </li>
            <li>
              As an unauthenticated user, I can browse other users' walls of images.
            </li>
            <li>
              As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image.
            </li>
          </ul>
        </Col>
        <Col>
          <h3>Libraries/Frameworks</h3>
          <p>
            I used
            {' '}
            <a href="https://www.meteor.com/">Meteor</a>
            {' '}
            as the platform. Combined with
            {' '}
            <a href="https://guide.meteor.com/react.html">React</a>
            . I also used
            {' '}
            <a
              href="https://github.com/ReactTraining/react-router/tree/master/packages/react-router"
            >
              React Router
            </a>
            {' '}
            for the routing.
          </p>
          <p>
            It is styled with
            {' '}
            <a href="https://react-bootstrap.github.io/">react-bootstrap</a>
            {' '}
            and the Journal theme from
            {' '}
            <a href="https://bootswatch.com/">boostswatch</a>
            .
          </p>
          <p>
            I also used
            {' '}
            <a href="https://github.com/eiriklv/react-masonry-component">
              react-masonry-component
            </a>
            {' '}
            to display the image thumbnails and
            {' '}
            <a href="https://github.com/joshwnj/react-visibility-sensor">
              react-visibility-sensor
            </a>
            {' '}
            to allow infinite scrolling.
          </p>
        </Col>
      </Row>
    );
  }
}
