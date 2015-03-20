'use strict';

var Reflux = require('reflux');

var TextEditableActions = Reflux.createActions([
  'toggleEditTextEditable',
  'updateTextEditable'
]);

module.exports = TextEditableActions;