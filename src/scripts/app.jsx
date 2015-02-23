'use strict';

var React = require('react'),
    Table = require('./components/Table.jsx');


// Init app stores
// DescriptorActions.loadDescriptors();
// StackActions.loadStacks();
// RankActions.loadRanks();

React.render(
  <Table />,
  document.getElementById('content')
);

// Structure de données :
// Chaque stack a n critètes et 1 valeur par critère
// Le tableau contient n stacks et n catégories et 1 résultat par stack
// 
// Features :
// - chaque critère peut être réordonnée
// - chaque catégorie donne un poid aux valeurs
// - le placement du critère par rapport au catégorie influence le total
// - le tableau contient l'ordre d'affichage des critères ainsi que l'emplacement des catégories
//
//
// var descriptor = {
//   descriptor: {
//     id: 1,
//     type: 'criteria',
//     code: 'CRITERIA1',
//     label: 'criteria1',
//     weight: 1
//   },
//   descriptor: {
//     id: 1,
//     type: 'categorie',
//     code: 'CATEGORY1'
//     label: 'cat1',
//     wieght: 17
//   }
// }
// var table_rows = {
//   table_row: {
//     descriptor: criterias[0]
//     order: 1
//   },
//   table_row: {
//     descriptor: categories[1]
//     order: 2
//   }
// }
// var table_colums = {
//   table_column: {
//     value: labels,
//     order: 1 
//   },
//   table_column: {
//     value: stacks[0],
//     order: 2
//   }
// }
// var stack_value = {
//   stack_id: 1
//   criteria_id: 1,
//   value: 3
// }
// var stacks = [{
//    id: 1,
//    label: 'react.js',
//    order: 1
// }]

// var data = 
//   {rank: 5}
// ;

// React.render(
//   <Rank data={data} />,
//   document.getElementById('content')
// );
// var descriptors = [
//   {
//     id: 1,
//     type: 'criteria',
//     code: 'CRITERIA1',
//     label: 'criteria1',
//     weight: 1,
//     order: 1
//   },
//   {
//     id: 2,
//     type: 'category',
//     code: 'CATEGORY1',
//     label: 'cat1',
//     weight: 17,
//     order: 2
//   }
// ];
// var table_rows = [
//   {
//     descriptor: descriptors[0],
//     order: 1
//   },
//   {
//     descriptor: descriptors[1],
//     order: 2
//   }
// ];
// var stack_value = {
//   stack_id: 1,
//   criteria_id: 1,
//   value: 3
// }
// var stacks = [
//   {
//     id: 1,
//     label: 'react.js',
//     order: 1,
//     ranks: [
//       {
//         descriptor_id: 1,
//         value: 3
//       },
//       {
//         descriptor_id: 1,
//         value: 5
//       }
//     ]
//   }
// ];
// var table_colums = [
//   // table_column: {
//   //   value: labels,
//   //   order: 1 
//   // },
//   {
//     value: stacks[0],
//     order: 2
//   }
// ];

// var table = {
//   table_colums: table_colums,
//   table_rows: table_rows
// }