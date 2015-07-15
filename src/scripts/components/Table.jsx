'use strict';

var React = require('react/addons'),
    Reflux = require('reflux'),
    _ = require('lodash'),
    TableActions = require('../actions/TableActions'),
    TableStore = require('../stores/TableStore'),
    TextEditable = require('../components/TextEditable.jsx'),
    TextEditableStore = require('../stores/TextEditableStore'),
    TableRow = require('./TableRow.jsx'),
    TableHeader = require('./TableHeader.jsx'),
    TableFooter = require('./TableFooter.jsx');

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
    const handleMoveTableRow = _.bind(this.handleMoveTableRow, this);
    return (
      <div className="table">
        <div className="table-column">
        {rows.map( function(row) {
          let tableRow;
          if (row.type === 'header') {
            tableRow = <TableHeader key={row.id}
                          row={row} 
                          stacks={stacks}></TableHeader>
          } else if (row.type === 'criterion') {
            tableRow = <TableRow key={row.id} 
                          row={row} 
                          rows={rows} 
                          stacks={stacks} 
                          ranks={ranks}
                          onMoveTableRow={handleMoveTableRow}></TableRow>
          } else if (row.type === 'category') {
            tableRow = <TableRow key={row.id} 
                          row={row} 
                          rows={rows} 
                          stacks={stacks} 
                          ranks={ranks}
                          onMoveTableRow={handleMoveTableRow}></TableRow>
          } else if (row.type === 'footer') {
            tableRow = <TableFooter key={row.id} 
                          row={row} 
                          rows={rows} 
                          stacks={stacks} 
                          ranks={ranks}></TableFooter>
          }
          return tableRow;
        })}</div>
        <div className="table-column" >
          <TextEditable></TextEditable>
        </div>
      </div>
    );
  }
});

module.exports = Table;