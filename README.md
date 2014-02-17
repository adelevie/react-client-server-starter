This repo demonstrates a simple example app that uses React to serve the same template from the client and the server.

To install:

1. Clone and `cd` into the repo.
2. `npm install`
3. In one terminal window: `gulp`
4. In another terminal window: `npm start`

### Editing the app

You will edit code in the `src` folder:

1. `server.js` - a simple Express server.
2. `client.js` - code that is served to the client.
3. `shared.js` - code that is shared between client and server.

Take a look at `Widget` in `shared.js`:

```javascript
var Widget = React.createClass({
  render: function() {
    return (
      <p>Rendered from the {this.props.clientOrServer}. Data: {this.props.foo}</p>
    );
  }
});
```

Now take a look at `server.js` and `client.js` and notice how both of them access `Widget`.

This repo is mainly a proof-of-concept/quasi-starter app.

### gulpfile

I'm pretty new to `gulp`, but it has made the build process much simpler. It browserifies code in `client.js`, minifies it, and copies it to the `build` folder. It also reactifies all JSX code found in `client.js`, `server.js`, and `shared.js`.

Every now and then, `gulp` crashes while I'm editing. Most of the time just restarting it solves the problem.

### nodemon

This uses `nodemon` to restart the dev server when files change.

## TODO/areas for improvement

1. Better debugging (gulp, minified js, etc are tough to debug)
2. CRUD example where initial collection is rendered on the server, and new collection items are appended from the client.
3. Handle other static assets like CSS and images.
4. Tests?
5. Parse/Backbone integration.

#### License

MIT License. 
Copyright 2014 Alan deLevie.