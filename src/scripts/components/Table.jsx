'use strict';

/** @jsx React.DOM */

var React = require('react/addons'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    TableStore = require('../stores/TableStore'),
    TableActions = require('../actions/TableActions'),
    Rank = require('../components/Rank.jsx');


var Table = React.createClass({
  displayName: 'Table',
  // propTypes: {
  // },
  mixins: [
    Reflux.listenTo(TableStore, 'onLoadTable')
  ],
  getInitialState: function() {
    return {
      descriptors: [],
      stacks: [],
      ranks : []
    };
  },
  componentWillMount: function() {
    TableActions.loadTable();
  },
  onLoadTable: function(table) {
    this.setState({
      descriptors: table.descriptors,
      stacks: table.stacks,
      ranks: table.ranks
    });
  },
  computeRanks: function(stacks, rows, ranks) {
    var sum = [];
    stacks.map(function (stack) {
      sum[stack.id] = 0
      rows.map(function (row) {
        if (row.type === 'criteria') {
          // if row is a criteria, we sum rank value * row weight
          var rank = _.find(ranks, {'descriptor_code' : row.code, stack_id : stack.id});
          sum[stack.id] += rank.value * row.weight;
        } else if (row.type === 'category') {
          // if row is a category, we multiply sum by the row weight
          sum[stack.id] = sum[stack.id] * row.weight;
        }
      });
    });
    return sum;
  },
  render: function() {
    var rows = this.state.descriptors.sort( function(a, b) {
          return a.order > b.order;
        });
    var stacks = this.state.stacks.sort( function(a, b) {
          return a.order > b.order;
        });
    var ranks = this.state.ranks;
    var sum = this.computeRanks(stacks, rows, ranks);
    return (
      <div>{rows.map( function(row) {
        var code = row.code,
            type = row.type,
            weight = row.weight,
            label = row.label,
            draggable = type === 'header' ? false : true;
        return (
          <div key={row.id} draggable={draggable} className="table-row">{type} / {weight} / {label} / /
          {stacks.map( function(stack) {
            var tableRow,
                rank;
            if (type === 'header') {
              tableRow = <div key={stack.id} className="rank-container">{stack.label}</div>
            } else if (type === 'criteria'){
              rank = ranks.filter( function(rank) { 
                return rank.descriptor_code === code && rank.stack_id === stack.id;
              })[0];
              tableRow = <Rank key={stack.id} stack={stack} descriptorCode={code} rank={rank}></Rank>
            } else if (type === 'category') {
            }
            if (type === 'footer') {
              tableRow = <div key={stack.id} className="rank-container">{sum[stack.id]}</div>
            }
            return (
              tableRow
            )
          })}</div>
        );
      })}</div>
    );
  }
});

module.exports = Table;