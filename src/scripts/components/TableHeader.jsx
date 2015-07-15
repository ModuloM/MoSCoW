'use strict';

const React = require('react'),
    _ = require('lodash');


var TableHeader = React.createClass({
  displayName: 'TableHeader',
  render: function () {
    let row = this.props.row,
        stacks = this.props.stacks;
    return (
      <div key={row.id} 
       className="table-row">
        <div className="table-row__content">{row.order} - [{row.type}]: {row.label} ({row.weight})</div>
        {stacks.map( function(stack) {
          // TODO change header style
          return (
            <div key={stack.id} className="table-cell__header">
              <a href={stack.url}>
                <img src={stack.logo} alt={stack.label} title={stack.label}/>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = TableHeader;