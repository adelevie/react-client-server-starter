/** @jsx React.DOM */


var React = require('react');
var BSHead = React.createClass({
  render: function() {
    var cssCdn = this.props.cssCdn;
    var presets = {
      readable: "//netdna.bootstrapcdn.com/bootswatch/3.1.0/readable/bootstrap.min.css",
      journal: "//netdna.bootstrapcdn.com/bootswatch/3.1.0/journal/bootstrap.min.css",
      superhero: "//netdna.bootstrapcdn.com/bootswatch/3.1.0/superhero/bootstrap.min.css"
    };
    var myCssCdn = presets[cssCdn];
    if (typeof myCssCdn === 'undefined') {
      myCssCdn = cssCdn;
    };
    return (
      <head>
        <title>Example App</title>
        <link href={myCssCdn} rel="stylesheet"></link>
        {this.props.children}
      </head>      
    )
  }
});

var BSColumn = React.createClass({
  render: function() {
    var width = "col-md-" + this.props.width + " column";
    return this.transferPropsTo(
      <div className={width}>
        {this.props.children}
      </div>
    )
  }
});

var BSContainer = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div className="container">
        {this.props.children}
      </div>
    )
  }
});

var BSListGroup = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div className="list-group">
        {this.props.children}
      </div>
    )
  }
});

var BSListGroupItem = React.createClass({
  proptypes: {
    active: React.PropTypes.bool,   // TODO: test this
    heading: React.PropTypes.bool
  },
  render: function() {
    var tag = "div";
    var active = this.props.active;
    var activeStr = "";
    if (typeof active !== 'undefined') {
      if (active) {
        activeStr = " active";
        tag = "a";
      }
    }
    if (typeof this.props.href !== 'undefined') {
      tag = "a";
    }
    var heading = this.props.heading;
    var headingStr = "";
    if (typeof heading !== 'undefined') {
      if (heading) {
        headingStr = "-heading";
      }
    }
    var classNameStr = "list-group-item" + headingStr + activeStr;
    return this.transferPropsTo(React.DOM[tag](
      {className: classNameStr}, 
      this.props.children
    ))
  }
});

var BSForm = React.createClass({
  render: function() {
    return (
      this.transferPropsTo(
        <form role="form">
          {this.props.children}
        </form>
      )
    )
  }
});

var BSHelpBlock = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <p className="help-block">
        {this.props.children}
      </p>
    )
  }
});

var BSFormGroup = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div className="form-group">
        {this.props.children}
      </div>
    )
  }
});

var BSFormGroup = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <div className="form-group">
        {this.props.children}
      </div>
    )
  }
});

var BSCheckBox = React.createClass({
  render: function() {
    return (
      <div className="checkbox">
        <label>
          <input name={this.props.name}
                 type="checkbox" 
                 id={this.props.id} /> 
          {this.props.children}
        </label>
      </div>
    )
  }
});

var BSInput = React.createClass({
  render: function() {
    var helpTextNode;
    helpText = this.props.helpText;
    if (typeof helpText !== 'undefined') {
      helpTextNode = (<BSHelpBlock>{helpText}</BSHelpBlock>);
    }
    var inputNode = React.DOM.input({
      className: "form-control"
    }, null);
    this.transferPropsTo(inputNode);
    return (
      <BSFormGroup>
        <label for={this.props.id}>{this.props.children}</label>
        {inputNode}
        {helpTextNode}
      </BSFormGroup>
    )
  }
});

var BSRow = React.createClass({
  render: function() {
    return (
      <div className="row clearfix">
        {this.props.children}
      </div>
    )
  }
});

var BSTopBar = React.createClass({
  render: function() {
    return (
      <BSRow>
        <BSColumn width="12">
          <h3>{this.props.title}</h3>
        </BSColumn>
      </BSRow>
    )
  }
});

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

var BSButton = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <button type="submit" className="btn btn-default">
        {this.props.children}
      </button>
    )
  }
});

var ExampleForm = React.createClass({
  render: function() {
    return (
      <BSForm method="get">
        <BSInput type="email" id="exampleInputEmail1" name="email" name="alan">Email Address</BSInput>
        <BSInput type="password" id="exampleInputPassword1">Password</BSInput>
        <BSInput type="file" 
                 id="exampleInputFile" 
                 helpText="Example block-level help text here.">
          File Input
        </BSInput>
        <BSCheckBox type="checkbox" id="exampleCheckbox" name="exampleCheckbox">Check it</BSCheckBox>
        <BSButton>Submit</BSButton>
      </BSForm>
    )
  }
});

var Layout = React.createClass({
  render: function() {
    return (
      <html>
        <BSHead cssCdn="readable"/>
        <body>
          <BSContainer>
            <BSTopBar title="Example App" />
            <BSRow>
              <BSColumn width="2">
                left
              </BSColumn>
              <BSColumn width="6">
                {this.props.children}
              </BSColumn>
              <BSColumn width="4">
                right
              </BSColumn>
            </BSRow>
          </BSContainer>
          <script src="/client.js" />
        </body>
      </html>
    )
  }
});

var Widget = React.createClass({
  render: function() {
    return (
      <p>Widget rendered from {this.props.clientOrServer}. Post Id from params: {this.props.postId}.</p>
    );
  }
});

module.exports = {
  BSHead: BSHead,
  BSColumn: BSColumn,
  BSContainer: BSContainer,
  BSListGroup: BSListGroup,
  BSListGroupItem: BSListGroupItem,
  BSForm: BSForm,
  BSHelpBlock: BSHelpBlock,
  BSFormGroup: BSFormGroup,
  BSInput: BSInput,
  BSCheckBox: BSCheckBox,
  BSRow: BSRow,
  BSTopBar: BSTopBar,
  BSButton: BSButton,
  NavBar: NavBar,
  ExampleForm: ExampleForm,
  Layout: Layout,
  Widget: Widget,
};
