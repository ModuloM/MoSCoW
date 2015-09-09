'use strict';

const React = require('react');

var TextEditableForm = React.createClass({
    displayName: 'TextEditableForm',
    propTypes: {
      value: React.PropTypes.string
    },
    componentDidMount: function () {
        this.refs.text.getDOMNode().focus();  
    },
    handleBlur: function(e) {
      this.handleSubmit(e)
    },
    handleSubmit: function(e) {
      e.preventDefault();
      let text = this.refs.text.getDOMNode().value.trim();
      this.props.onTextEditableSubmit(text);
    },
    render: function () {
      var value = this.props.value;
      return (
        <form onSubmit={this.handleSubmit}>
          <textarea ref="text" className="text-container__input" defaultValue={value} onBlur={this.handleBlur} rows="7" placeholder="Text by default" />
        </form>
      );
    }
});

module.exports = TextEditableForm;
