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
3. `shared.js` - code that is shared between client and server. Most app logic is here.
4. `bootstrap.js` - Bootstrap broken up into many React components

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

This repo is mainly a proof-of-concept/quasi-starter app.

### Bootstrap components

Skim `bootstrap.js`. Many elements usually require annoying boilerplate of `<div>`'s and `class=` attributes. I did my best to lightly wrap that all away. For example, 

```javascript
<BSButton>Click Here</BSButton>
```

is easier than:

```javascript
<button type="submit" className="btn btn-default">
  Click Here
</button>
```

The composability of React componenets also make it easy to factor out large portions of UI code, keeping layout code concise:

```javascript
<html>
  <BSHead cssCdn="readable"/>
  <body>
    <BSContainer>
      <BSTopBar title="Example App" />
      <BSRow>
        <BSColumn width="2">
          <NavBar pages={this.props.navPages} />
        </BSColumn>
        <BSColumn width="6">
          {this.props.children}
        </BSColumn>
        <BSColumn width="4">
          <ExampleForm />
        </BSColumn>
      </BSRow>
    </BSContainer>
    <script src="/client.js" />
  </body>
</html>
```

I'm not really concerned with supporting non-GET requests. An API/backend that accepts those requests really should be a separate application and/or service. Or just use Parse.

One great benefit of using React components with a tightly-coupled routes-to-handlers mechanism is that setting navbar buttons to "active" can be completely hidden away from day-to-day development. It's common webapp behavior that shouldn't clutter up actual business logic. Here's example `NavBar` code:

```javascript
var NavBar = React.createClass({
  render: function() {
    var BSListGroupItemNodes = this.props.pages.map(function(page) {
      return (
        <BSListGroupItem href={page.route} active={page.active}>
          {page.name}
        </BSListGroupItem>);
    });
    return (
      <BSListGroup>
        {BSListGroupItemNodes}
      </BSListGroup>
    );
  }
});
```

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
