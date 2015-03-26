'use strict';

var React = require('react');

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
      var text = this.refs.text.getDOMNode().value.trim();
      this.props.onTextEditableSubmit(text);
    },
    render: function () {
      var value = this.props.value;
      return (
        <form className="textEditableForm" onSubmit={this.handleSubmit}>
          <textarea ref="text" defaultValue={value} onBlur={this.handleBlur} />
        </form>
      );
    }
});

module.exports = TextEditableForm;
