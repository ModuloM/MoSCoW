'use strict';

var React = require('react/addons'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    TableActions = require('../actions/TableActions'),
    TableStore = require('../stores/TableStore'),
    TextEditable = require('../components/TextEditable.jsx'),
    TextEditableStore = require('../stores/TextEditableStore'),
    TableRow = require('./TableRow.jsx');

var Table = React.createClass({
  displayName: 'Table',
  // propTypes: {
  // },
  mixins: [
    Reflux.listenTo(TableStore, 'onLoadTable'),
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
  handleMoveTableRow: function(itemId, overId) {
    TableActions.updateDescriptorOrder(itemId, overId);
  },
  render: function() {
    var rows = this.state.descriptors.sort( function(a, b) {
          return a.order > b.order;
        });
    var stacks = this.state.stacks.sort( function(a, b) {
      return a.order > b.order;
    });
    var ranks = this.state.ranks;
    var handleMoveTableRow = _.bind(this.handleMoveTableRow, this);
    return (
      <div className="table">
        <div className="table-column">
        {rows.map( function(row) {
          return (
            <TableRow key={row.id} 
                      row={row} 
                      rows={rows} 
                      stacks={stacks} 
                      ranks={ranks}
                      onMoveTableRow={handleMoveTableRow}></TableRow>
            // <div key={id} {...dragSourceFor(ItemTypes.TABLE_ROW)} className="table-row">{type} / {weight} / {label} / /
            // {stacks.map( function(stack) {
            //   var tableRow,
            //       rank;
            //   if (type === 'header') {
            //     // TODO change header style
            //     tableRow = <div key={stack.id} className="rank-container">{stack.label}</div>
            //   } else if (type === 'criterion'){
            //     rank = _.find( ranks, { 'descriptor_code' : code, 'stack_id' : stack.id});
            //     tableRow = <Rank key={rank.id} stack={stack} descriptorCode={code} rank={rank} selected={rank.selected} editable={rank.editable}></Rank>
            //   } else if (type === 'category') {
            //     // TODO define category row
            //   }
            //   if (type === 'footer') {
            //     // TODO change footer style
            //     tableRow = <div key={stack.id} className="rank-container">{sum[stack.id]}</div>
            //   }
            //   return (
            //     tableRow 
            //   )
            // })}</div>
          );
        })}</div>
        <div className="table-column" >
          <TextEditable></TextEditable>
        </div>
      </div>
    );
  }
});

module.exports = Table;