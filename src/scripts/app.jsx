'use strict';

var React = require('react'),
    Table = require('./components/Table.jsx');


// Render Table component & attache to DOM
React.render(
  <Table />,
  document.getElementById('content')
);

//
// Data structure :
// Each stack have n criteria and n categories, each has one rank value
// The table contain n stacks
// 
// Features :
// - each criterion or category could be reordered
// - each criterion or category have a weight
// - sum is done by adding from top to bottom each rank value, mutiplied by category / criterion weight
//
