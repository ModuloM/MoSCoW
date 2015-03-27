'use strict';

var React = require('react'),
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
  getInitialState: function() {
    return {
      id : this.props.row.id,
      row : this.props.row,
      rows : this.props.rows,
      stacks : this.props.stacks,
      ranks : this.props.ranks
    };
  },
  // TODO change code into ESnext syntaxe
  // statics: {
  //     configureDragDrop: function configureDragDrop (register) {
  //       register(ItemTypes.TABLE_ROW, {
  //         dragSource: {
  //           beginDrag: function beginDrag(component) {
  //             return {
  //               item: {
  //                 id: component.props.id
  //               }
  //             };
  //           }
  //         },
  //         dropTarget: {
  //           over: function over(component, item) {
  //             console.log(component, item);
  //             // component.props.moveCard(item.id, component.props.id);
  //           }
  //         }
  //       });
  //     }
  // },
  statics: {
    configureDragDrop(register) {
      register(ItemTypes.TABLE_ROW, {
        dragSource,
        dropTarget
      });
    }
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
  // put this in parent component and passe result with props
  computeRanks: function(stacks, rows, ranks) {
    var sum = [];
    stacks.map(function (stack) {
      sum[stack.id] = 0
      rows.map(function (row) {
        if (row.type === 'criterion') {
          // if row is a criterion, we sum rank value mutliplied by row's weight
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
  render: function () {
    var row = this.state.row,
        rows = this.state.rows,
        stacks = this.state.stacks,
        ranks = this.state.ranks,
        sum = this.computeRanks(stacks, rows, ranks),
        handleSelectRank = _.bind(this.handleSelectRank, this),
        handleDeselectRanks = _.bind(this.handleDeselectRanks, this),
        dragSourceFor = _.bind(this.dragSourceFor, this),
        dropTargetFor = _.bind(this.dropTargetFor, this),
        code = row.code,
        type = row.type,
        weight = row.weight,
        label = row.label,
        dragStart = this.getDragState(ItemTypes.TABLE_ROW),
        opacity = dragStart.isDragging ? 0 : 1;
    return (
      <div key={row.id} 
      {...dragSourceFor(ItemTypes.TABLE_ROW)}
      {...dropTargetFor(ItemTypes.TABLE_ROW)}
       className="table-row" style={{opacity}}>
        <div className="table-row__content">{row.order} - [{type}]: {label} ({weight})</div>
        {stacks.map( function(stack) {
          var tableRow,
              rank;
          if (type === 'header') {
            // TODO change header style
            tableRow = <div key={stack.id} className="rank-container">{stack.label}</div>
          } else if (type === 'criterion'){
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
        })}
      </div>
    );
  }
});

module.exports = TableRow;