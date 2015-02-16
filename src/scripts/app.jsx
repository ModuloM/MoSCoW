'use strict';

var React = require('react'),
    Rank = require('./modules/Rank.jsx');

var data = [
  {rank: 1},
  {rank: 2},
  {rank: 3},
  {rank: 4},
  {rank: 5}
];

React.render(
    <Rank data={data} />,
    document.getElementById('content')
  );