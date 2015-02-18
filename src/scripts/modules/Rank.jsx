'use strict';

var React = require('react');

var Rank = React.createClass({
  getInitialState: function() {
    return {
      rank: this.props.data.rank,
      value: this.props.data.rank,
      selected: false,
      editable: false
    };
  },
  handleClick: function(event) {
    if (!this.state.editable) {
      this.setState({selected : !this.state.selected});
    }
  },
  handleDoubleClick: function(event) {
    this.setState({editable : !this.state.editable});
    this.setState({selected : false});
  },
  handleChange: function() {
    this.setState({value: event.target.value});
    this.setState({rank: event.target.value});
  },
  render: function() {
    var ranking = this.state.rank,
        value = this.state.value;
    if (this.state.editable) {
      ranking = <input type="text" className="rank--input" value={value} onChange={this.handleChange} />
    }
    var rankClass = 'rank--' + ranking;
    if (this.state.selected) {
      rankClass += ' rank--selected';
    }

    return (
      <div className="rank-container">
        <div className={rankClass} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>
          {ranking}
        </div>
      </div>
    );
  }
});

module.exports = Rank;