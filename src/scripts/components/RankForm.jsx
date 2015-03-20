'use strict';

/** @jsx React.DOM */

var React = require('react/addons');

var RankForm = React.createClass({
  displayName: 'RankForm',
  propTypes: {
      value: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5,'0','1','2','3','4','5'])
  },
  componentDidMount: function() {
    this.refs.rank.getDOMNode().focus();
  },
  handleBlur: function(e) {
    this.handleSubmit(e);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var rank = this.refs.rank.getDOMNode().value.trim();
    this.props.onRankSubmit(rank);
  },
  render: function () {
    var value = this.props.value;  
    return (
      <form className="rankForm" onSubmit={this.handleSubmit}>
        <input type="text" ref="rank" className="rank--input" defaultValue={value} onBlur={this.handleBlur}/>
      </form>
    );
  }
});

module.exports = RankForm;