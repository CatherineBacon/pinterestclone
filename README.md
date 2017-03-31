# pinterest clone

This app was created as part of the following FreeCodeCamp challenge: https://www.freecodecamp.com/challenges/build-a-pinterest-clone

**Final app: UPDATE**

## Objective

Build a full stack JavaScript app that is functionally similar to [this](https://midnight-dust.hyperdev.space)

### User Stories:

- As an unauthenticated user, I can login with Twitter. *As I don't have a twitter account I've chose to login with Google*.
- As an authenticated user, I can link to images.
- As an authenticated user, I can delete images that I've linked to.
- As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
- As an unauthenticated user, I can browse other users' walls of images.
- As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image.

## Libraries/Frameworks

I used [Meteor](https://www.meteor.com/) as the platform. Combined with [React](https://guide.meteor.com/react.html).

I also used [React Router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router) for the routing.

It is styled with [react-bootstrap](https://react-bootstrap.github.io/) and the Journal theme from [bootswatch](https://bootswatch.com/).

I also used [react-masonry-component](https://github.com/eiriklv/react-masonry-component) to display the image thumbnails and [react-visibility-sensor](https://github.com/joshwnj/react-visibility-sensor) to allow infinite scrolling.
