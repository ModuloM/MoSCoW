'use strict';

var React = require('react');

var Rank = React.createClass({
  render: function() {
    var rankNodes = this.props.data.map(function (item){
      var rankClass = 'rank--' + item.rank;
      return (
        <div className={rankClass}>{item.rank}</div>
      );
    });
    return (
      <div>
        {rankNodes}
      </div>
    );
  }
});

module.exports = Rank;