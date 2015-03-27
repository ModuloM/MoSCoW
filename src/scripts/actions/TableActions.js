'use strict';

var Reflux = require('reflux');

var TableActions = Reflux.createActions([
  'loadTable',
  'updateRank',
  'updateRankText',
  'toggleSelectRank',
  'toggleEditRank',
  'deselectRanks',
  'updateDescriptorOrder'
]);

module.exports = TableActions;