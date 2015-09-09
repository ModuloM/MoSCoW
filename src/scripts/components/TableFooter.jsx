'use strict';

const React = require('react'),
    _ = require('lodash');

var TableFooter = React.createClass({
  displayName: 'TableFooter',
  // put this in parent component and passe result with props
  computeRanks: function(stacks, rows, ranks) {
    let sums = [],
        best = 0;
    stacks.map(function (stack) {
      let sum = {
        id: stack.id,
        value: 0
      };
      rows.map(function (row) {
        if (row.type === 'criterion') {
          // if row is a criterion, we sum rank value multiplied by row's weight
          let rank = _.find(ranks, {'descriptor_code' : row.code, stack_id : stack.id});
          sum.value += rank.value * row.weight;
        } else if (row.type === 'category') {
          // if row is a category, we multiply sum by the row's weight
          sum.value = sum.value * row.weight;
        }
      });
      sums.push(sum);
    });
    return _.sortBy(sums, 'value').reverse();
  },
  getSumClass: function(sums, stackId) {
    const stackRanking = _.findIndex(sums, {id: stackId}) + 1;
    return `stack-sum stack-sum--${stackRanking}`;
  },
  render: function () {
    let row = this.props.row,
        rows = this.props.rows,
        stacks = this.props.stacks,
        ranks = this.props.ranks,
        sums = this.computeRanks(stacks, rows, ranks),
        getSumClass = _.bind(this.getSumClass, this);
    return (
      <div key={row.id} className="table-row">
        <div className="table-row__content">{row.order} - [{row.type}]: {row.label} ({row.weight})</div>
        {stacks.map( function(stack) {
            // TODO change footer stylez
            return <div key={stack.id} className="table-cell__footer"><span className={getSumClass(sums, stack.id)}><span className="rank--3">{_.find(sums, {id: stack.id}).value}</span></span></div>
        })}
      </div>
    );
  }
});

module.exports = TableFooter;