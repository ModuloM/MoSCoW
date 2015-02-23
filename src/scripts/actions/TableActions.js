'use strict';

var Reflux = require('reflux');

var TableActions = Reflux.createActions([
  'loadTable',
  'updateTableRank',
  'updateTableOrder'
]);

module.exports = TableActions;