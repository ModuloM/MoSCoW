'use strict';

var Reflux = require('reflux');

var TableActions = Reflux.createActions([
  'loadTable',
  'updateRank',
  'toggleSelectRank',
  'toggleEditRank',
  'deselectRanks',
  'updateTableOrder'
]);

module.exports = TableActions;