'use strict';

var React = require('react');

var Rank = React.createClass({
  getInitialState: function() {
    return {selected: false};
  },
  handleClick: function(event) {
    this.setState({selected : !this.state.selected});
  },
  // render: function() {
  //   var rankNodes = this.props.data.map(function (item){
  //     var rankClass = 'rank--' + item.rank;
  //     if (this[item.rank].state.selected) {
  //       rankClass += ' tank--selected';
  //     }
      
  //     return (
  //       <div className="rank-container">
  //         <div key={item.rank} className={rankClass} >
  //           {item.rank}
  //         </div>
  //       </div>
  //     );
  //   });
  //   return (
  //     <div className="rank-list">
  //       {rankNodes}
  //     </div>
  //   );
  // }
  render: function() {
    var ranking = this.props.data.rank;
    var rankClass = 'rank--' + ranking;
    if (this.state.selected) {
      rankClass += ' rank--selected';
    }

    return (
      <div className="rank-container">
        <div key={ranking} className={rankClass} onClick={this.handleClick} >
          {ranking}
        </div>
      </div>
    );
  }
});

module.exports = Rank;