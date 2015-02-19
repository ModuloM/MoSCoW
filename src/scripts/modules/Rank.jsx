'use strict';

/** @jsx React.DOM */

var React = require('react/addons'),
    classSet = React.addons.classSet,
    RankForm = require('./RankForm.jsx');

var Rank = React.createClass({
  getInitialState: function() {
    return {
      rank: this.props.data.rank,
      selected: false,
      editable: false
    };
  },
  handleClick: function(e) {
    if (!this.state.editable) {
      this.setState({selected : !this.state.selected});
    }
  },
  handleDoubleClick: function(e) {
    this.setState({editable : !this.state.editable});
    this.setState({selected : false});
    e.currentTarget.focus();
  },
  handleBlur: function(e) {
    this.handleChange(e);
    this.setState({selected : false});
    this.setState({editable : false});
  },
  handleChange: function(e) {
    this.setState({rank : e.target.value});
  },
  handleCommentSubmit: function(rank) {
    // TODO
    this.setState(rank);
    this.setState({selected : true});
    this.setState({editable : false});
  },
  render: function() {
    var ranking = this.state.rank;
    if (this.state.editable) {
      ranking = <RankForm value={this.state.rank} onRankSubmit={this.handleCommentSubmit} />
    }
    // TODO change with classSet method
    var rankClass = 'rank--' + ranking;
    if (this.state.selected) {
      rankClass += ' rank--selected';
    }

    return (
      <div className="rank-container">
        <div className={rankClass} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} onBlur={this.handleBlur} >
          {ranking}
        </div>
      </div>
    );
  }
});

module.exports = Rank;