'use strict';

/** @jsx React.DOM */

var React = require('react/addons'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    TableStore = require('../stores/TableStore'),
    TextEditableStore = require('../stores/TextEditableStore'),
    TableActions = require('../actions/TableActions'),
    Rank = require('../components/Rank.jsx'),
    TextEditable = require('../components/TextEditable.jsx');


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
  handleSelectRank: function(selectedRank) {
    var ranks = this.state.ranks;
    ranks.map( function(rank) {
      if (rank.id !== selectedRank.id) {
        rank.selected = false;
      } else {
        rank.selected = true;
      }
    });
    this.setState({ranks : ranks});
  },
  handleDeselectRanks: function() {
    var ranks = this.state.ranks;
    ranks.map( function(rank) {
      rank.selected = false;
    });
    this.setState({ranks : ranks});
  },
  computeRanks: function(stacks, rows, ranks) {
    var sum = [];
    stacks.map(function (stack) {
      sum[stack.id] = 0
      rows.map(function (row) {
        if (row.type === 'criteria') {
          // if row is a criteria, we sum rank value mutliplied by row's weight
          var rank = _.find(ranks, {'descriptor_code' : row.code, stack_id : stack.id});
          sum[stack.id] += rank.value * row.weight;
        } else if (row.type === 'category') {
          // if row is a category, we multiply sum by the row's weight
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
    var handleSelectRank = _.bind(this.handleSelectRank, this);
    var handleDeselectRanks = _.bind(this.handleDeselectRanks, this);
    return (
      <div className="table">
        <div className="table-column">{rows.map( function(row) {
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
                // TODO change header style
                tableRow = <div key={stack.id} className="rank-container">{stack.label}</div>
              } else if (type === 'criteria'){
                rank = _.find( ranks, { 'descriptor_code' : code, 'stack_id' : stack.id});
                tableRow = <Rank key={rank.id} stack={stack} descriptorCode={code} rank={rank} selected={rank.selected} editable={rank.editable}></Rank>
              } else if (type === 'category') {
                // TODO define category row
              }
              if (type === 'footer') {
                // TODO change footer style
                tableRow = <div key={stack.id} className="rank-container">{sum[stack.id]}</div>
              }
              return (
                tableRow 
              )
            })}</div>
          );
        })}</div>
        <div className="table-column text-container" >
          <TextEditable></TextEditable>
        </div>
      </div>
    );
  }
});

module.exports = Table;