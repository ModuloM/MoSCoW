'use strict';

var Reflux = require('reflux'),
    TableActions = require('../actions/TableActions');

var TextEditableStore = Reflux.createStore({
  listenables: [
    require('../actions/TableActions'),
    require('../actions/TextEditableActions')
  ],
  init: function() {
    this.text = {
      objectId: 0,
      value: '',
      editable: false
    };
  },
  onToggleSelectRank: function(selectedRank, value) {
    this.text.value = selectedRank.notes;
    this.text.objectId = selectedRank.id;
    console.log(`Text updated from rank ${selectedRank.id}`);
    this.trigger(this.text);
  },
  onToggleEditTextEditable: function(editedTextEditable, value) {
    this.text.editable = value;
    console.log('Text is editable');
    this.trigger(this.text);
  },
  onUpdateTextEditable: function(objectId, value) {
    // TODO sanitize data !!
    // SECURITY FLAW
    // FIXME
    this.text.value = value;
    this.text.editable = false;
    TableActions.updateRankText(objectId, value);
    console.log(`Text is udate with value: ${value}`);
    this.trigger(this.text);
  }
});

module.exports = TextEditableStore;