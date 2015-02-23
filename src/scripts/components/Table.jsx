'use strict';

/** @jsx React.DOM */

var React = require('react/addons'),
    Reflux = require('reflux'),
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
  render: function() {
    var rows = this.state.descriptors.sort( function(a, b) {
          return a.order > b.order;
        });
    var stacks = this.state.stacks.sort( function(a, b) {
          return a.order > b.order;
        });
    var ranks = this.state.ranks;
    return (
      <div>{rows.map( function(row) {
        var code = row.code,
            type = row.type,
            weight = row.weight,
            label = row.label,
            draggable = type === 'header' ? false : true;
        return (
          <div key={code} draggable={draggable} className="table-row">{type} / {weight} / {label} / /
          {stacks.map( function(stack) {
            var tableRow,
                rank;
            if (type === 'header') {
              tableRow = <div key={stack.id} className="rank-container">{stack.label}</div>
            } else if (type === 'criteria'){
              // tableCell = stack.ranks.filter( function(rank) { 
              //   return rank.descriptor_code === code;
              // })[0];
              rank = ranks.filter( function(rank) { 
                return rank.descriptor_code === code && rank.stack_id === stack.id;
              })[0];
              // rank = rank ? rank.value : 0
              tableRow = <Rank key={stack.id} stack={stack} descriptorCode={code} rank={rank}></Rank>
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