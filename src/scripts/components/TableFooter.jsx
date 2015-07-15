'use strict';

const React = require('react'),
    _ = require('lodash');

var TableFooter = React.createClass({
  displayName: 'TableFooter',
  // put this in parent component and passe result with props
  computeRanks: function(stacks, rows, ranks) {
    let sum = [];
    stacks.map(function (stack) {
      sum[stack.id] = 0
      rows.map(function (row) {
        if (row.type === 'criterion') {
          // if row is a criterion, we sum rank value multiplied by row's weight
          let rank = _.find(ranks, {'descriptor_code' : row.code, stack_id : stack.id});
          sum[stack.id] += rank.value * row.weight;
        } else if (row.type === 'category') {
          // if row is a category, we multiply sum by the row's weight
          sum[stack.id] = sum[stack.id] * row.weight;
        }
      });
    });
    return sum;
  },
  render: function () {
    let row = this.props.row,
        rows = this.props.rows,
        stacks = this.props.stacks,
        ranks = this.props.ranks,
        sum = this.computeRanks(stacks, rows, ranks);
    return (
      <div key={row.id} className="table-row">
        <div className="table-row__content">{row.order} - [{row.type}]: {row.label} ({row.weight})</div>
        {stacks.map( function(stack) {
            // TODO change footer stylez
            return <div key={stack.id} className="table-cell__footer">{sum[stack.id]}</div>
        })}
      </div>
    );
  }
});

module.exports = TableFooter;