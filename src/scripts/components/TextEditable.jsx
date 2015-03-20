'use strict';

/** @jsx React.DOM **/

var React = require('react/addons'),
    Reflux = require('reflux'),
    TextEditableActions = require('../actions/TextEditableActions'),
    TextEditableStore = require('../stores/TextEditableStore'),
    TextEditableForm = require('./TextEditableForm.jsx');

var TextEditable = React.createClass({
  displayName: 'TextEditable',
  propTypes: {
      objectId: React.PropTypes.number,
      value: React.PropTypes.string,
      editable: React.PropTypes.bool
  },
  mixins: [Reflux.listenTo(TextEditableStore,'onStatusChange')],
  getInitialState: function () {
    return {
      objectId: 0, 
      value: 'Default text',
      editable: false
    };
  },
  onStatusChange: function(textStatus) {
    this.setState({
        objectId: textStatus.objectId,
        value: textStatus.value,
        editable: textStatus.editable
    });
  },
  handleDoubleClick: function(e) {
    TextEditableActions.toggleEditTextEditable({
      objectId: this.state.objectId,
      value: this.state.value
    }, !this.state.editable);
  },
  handleTextEditableSubmit: function(value) {
    TextEditableActions.updateTextEditable(this.state.objectId, value);
  },
  render: function () {
    var element;
    if (this.state.editable) {
      element = <TextEditableForm value={this.state.value} onTextEditableSubmit={this.handleTextEditableSubmit}/>
    } else {
      element = <div className="" onDoubleClick={this.handleDoubleClick}>{this.state.value}</div>
    }
    return (
        element
    );
  }
});

module.exports = TextEditable;