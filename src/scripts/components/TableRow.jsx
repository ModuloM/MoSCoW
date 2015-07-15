'use strict';

const React = require('react'),
    _ = require('lodash'),
    DragDropMixin = require('react-dnd').DragDropMixin,
    ItemTypes = require('./ItemTypes'),
    Rank = require('../components/Rank.jsx');

const dragSource = {
  canDrag(component) {
    return component.props.row.type === 'criterion' || component.props.row.type === 'category';
  },
  beginDrag(component) {
    return {
      item: {
        id: component.props.row.id
      }
    };
  }
};

const dropTarget = {
  over(component, item) {
    component.props.onMoveTableRow(item.id, component.props.row.id);
  }
};

var TableRow = React.createClass({
  displayName: 'TableRow',
  mixins: [
      DragDropMixin    
  ],
  statics: {
    configureDragDrop(register) {
      register(ItemTypes.TABLE_ROW, {
        dragSource,
        dropTarget
      });
    }
  },
  handleSelectRank: function(selectedRank) {
    let ranks = this.props.ranks;
    ranks.map( function(rank) {
      if (rank.id !== selectedRank.id) {
        rank.selected = false;
      } else {
        rank.selected = true;
      }
    });
    // this.setState({ranks : ranks});
  },
  handleDeselectRanks: function() {
    let ranks = this.props.ranks;
    ranks.map( function(rank) {
      rank.selected = false;
    });
    // this.SetProp({ranks : ranks});
  },
  render: function () {
    let row = this.props.row,
        rows = this.props.rows,
        stacks = this.props.stacks,
        ranks = this.props.ranks,
        handleSelectRank = _.bind(this.handleSelectRank, this),
        handleDeselectRanks = _.bind(this.handleDeselectRanks, this),
        dragSourceFor = _.bind(this.dragSourceFor, this),
        dropTargetFor = _.bind(this.dropTargetFor, this),
        dragStart = this.getDragState(ItemTypes.TABLE_ROW),
        opacity = dragStart.isDragging ? 0 : 1;
    return (
      <div key={row.id} 
      {...dragSourceFor(ItemTypes.TABLE_ROW)}
      {...dropTargetFor(ItemTypes.TABLE_ROW)}
       className="table-row" style={{opacity}}>
        <div className="table-row__content">{row.order} - [{row.type}]: {row.label} ({row.weight})</div>
        {stacks.map( function(stack) {
          var tableRow,
              rank;
          if (row.type === 'criterion'){
            rank = _.find( ranks, { 'descriptor_code' : row.code, 'stack_id' : stack.id});
            tableRow = <Rank key={rank.id} stack={stack} descriptorCode={row.code} rank={rank} selected={rank.selected} editable={rank.editable}></Rank>
          } else if (row.type === 'category') {
            // TODO define category row
          }
          return (
            tableRow 
          )
        })}
      </div>
    );
  }
});

module.exports = TableRow;