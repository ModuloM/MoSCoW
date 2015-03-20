'use strict';

var Reflux = require('reflux');

var TableActions = Reflux.createActions([
  'loadTable',
  'updateRank',
  'updateRankText',
  'toggleSelectRank',
  'toggleEditRank',
  'deselectRanks',
  'updateTableOrder'
]);

module.exports = TableActions;