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
          type: 'criterion',
          code: 'CRITERION1',
          label: 'criterion1',
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
          type: 'criterion',
          code: 'CRITERION2',
          label: 'criterion2',
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
          logo: 'http://facebook.github.io/react/img/logo.svg',
          url: 'https://angularjs.org/',
          order: 1
        },
        {
          id: 2,
          label: 'angular.js',
          logo: 'https://angularjs.org/favicon.ico',
          url: 'http://facebook.github.io/react/docs/',
          order: 2
        }
      ],
      ranks : [
        {
          id: 1,
          descriptor_code: 'CRITERION2',
          stack_id: 1,
          value: 3,
          notes: 'Notes on criterion two'
        },
        {
          id: 2,
          descriptor_code: 'CRITERION1',
          stack_id: 1,
          value: 5,
          notes: 'Notes on criterion one'
        },
        {
          id: 3,
          descriptor_code: 'CRITERION1',
          stack_id: 2,
          value: 1,
          notes: 'Other notes on criterion one'
        },
        {
          id: 4,
          descriptor_code: 'CRITERION2',
          stack_id: 2,
          value: 4,
          notes: 'Other notes on criterion two'
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
  getRankIdx: function(rankId) {
    return _.findIndex(this.table.ranks, { 'id': rankId });
  },
  onUpdateRank: function(rankId, value) {
    if (value >= 0 && value <= 5) {
      var rankIdx = this.getRankIdx(rankId);
      this.table.ranks[rankIdx].value = value;
      this.table.ranks[rankIdx].editable = false;
      this.table.ranks[rankIdx].selected = false;

      // TODO sync with Firebase
      console.log(`Rank ${rankId} updated with: ${value}.`);
      this.trigger(this.table);
    } else {
      if (value > 5) {
        value = 5;
      } else if (value < 0) {
        value = 0;
      };
      // TODO sanitize data & return value to apply error style on component
      this.trigger(this.table);
      console.log('Wrong type. Rank must be between 0 and 5.');
    }
  },
  onUpdateRankText: function(rankId, text) {
    console.log(rankId, text);
    var rankIdx = this.getRankIdx(rankId);
    this.table.ranks[rankIdx].notes = text;
    this.table.ranks[rankIdx].selected = true;
    console.log(`Rank ${rankId}’s notes updated with ${text}.`)
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
    // TODO implement:
    // if no rank are selected, set TextEditable value to default
  },
  onToggleEditRank: function(editedRank, value) {
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
  onUpdateDescriptorOrder: function(movedDescriptorsId, overedDescriptorId) {
    var rows = this.table.descriptors;
    var rowMovedIdx = _.findIndex(rows, { 'id' : movedDescriptorsId });
    var rowOveredIdx = _.findIndex(rows, { 'id' : overedDescriptorId });
    // Bind drag between header & footer
    if (overedDescriptorId !== 1 && overedDescriptorId !== rows.length) {
      var modifier = rows[rowOveredIdx].order > rows[rowMovedIdx].order ? 1 : -1;
      rows[rowMovedIdx].order += modifier;
      rows[rowOveredIdx].order -= modifier;
      this.table.descriptors = rows;
      this.trigger(this.table);    
    }
    // console.log(`Moved ${rowMovedIdx} descriptors ${rows[rowMovedIdx].label} order ${rows[rowMovedIdx].order} is updated with ${modifier}`);
    // console.log(`Overed ${rowOveredIdx} descriptors ${rows[rowOveredIdx].label} order ${rows[rowOveredIdx].order} is updated with - ${modifier}`);
  }
});

module.exports = TableStore;