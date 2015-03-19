'use strict';

var Reflux = require('reflux'),
    _ = require('lodash');

var TableStore = Reflux.createStore({
  listenables: [
    require('../actions/TableActions')
  ],
  init: function() {
    this.table = {};
  },
  onLoadTable: function(data) {

    this.table = {
      descriptors : [
        {
          id: 1,
          type: 'header',
          code: 'HEADER',
          label: '',
          weight: 1,
          order: 0
        },
        {
          id: 2,
          type: 'criteria',
          code: 'CRITERIA1',
          label: 'criteria1',
          weight: 1,
          order: 1
        },
        {
          id: 3,
          type: 'category',
          code: 'CATEGORY1',
          label: 'cat1',
          weight: 17,
          order: 3
        },
        {
          id: 4,
          type: 'criteria',
          code: 'CRITERIA2',
          label: 'criteria2',
          weight: 2,
          order: 2
        },
        {
          id: 5,
          type: 'footer',
          code: 'FOOTER',
          label: 'total',
          weight: 1,
          order: 4
        }
      ],
      stacks : [
        {
          id: 1,
          label: 'react.js',
          order: 1
        },
        {
          id: 2,
          label: 'angular.js',
          order: 2
        }
      ],
      ranks : [
        {
          id: 1,
          descriptor_code: 'CRITERIA2',
          stack_id: 1,
          value: 3
        },
        {
          id: 2,
          descriptor_code: 'CRITERIA1',
          stack_id: 1,
          value: 5
        },
        {
          id: 3,
          descriptor_code: 'CRITERIA1',
          stack_id: 2,
          value: 1
        },
        {
          id: 4,
          descriptor_code: 'CRITERIA2',
          stack_id: 2,
          value: 4
        }
      ]
    };
    this.table.ranks.map( function(rank){
      rank.selected = false;
      rank.editable = false;
    });
    // TODO sync with Firebase
    console.log("Table loaded");
    this.trigger(this.table);
  },
  onUpdateRank: function(rank, value) {
    var rankId = _.findIndex(this.table.ranks, { 'id': rank.id });
    this.table.ranks[rankId].value = value;
    this.table.ranks[rankId].editable = false;
    this.table.ranks[rankId].selected = false;

    // TODO sync with Firebase
    console.log(`Rank ${rankId} updated with value : ${value}`);
    this.trigger(this.table);
  },
  onToggleSelectRank: function(selectedRank, value) {
    this.table.ranks.map( function(rank) {
      if (rank.id !== selectedRank.id) {
        rank.selected = false;
      } else {
        rank.selected = value;
      }
    });
    console.log(`Rank ${selectedRank.id} is selected`);
    this.trigger(this.table);
  },
  onToggleEditRank: function(editedRank, value) {
    console.log('youpi')
    this.table.ranks.map( function(rank) {
      if (rank.id !== editedRank.id) {
        rank.editable = false;
      } else {
        rank.editable = value;
      }
    });
    console.log(`Rank ${editedRank.id} is editable`);
    this.trigger(this.table);
  },
});

module.exports = TableStore;