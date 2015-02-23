'use strict';

/** @jsx React.DOM */

var React = require('react/addons'),
    classSet = React.addons.classSet,
    Reflux = require('reflux'),
    TableActions = require('../actions/TableActions.js'),
    RankForm = require('./RankForm.jsx');

var Rank = React.createClass({
  displayName: 'Rank',
  propTypes: {
      // rank: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5,'0','1','2','3','4','5']),
      rank: React.PropTypes.object,
      stack: React.PropTypes.object,
      descriptorCode: React.PropTypes.string
  },
  mixins: [
    // Reflux.listenTo(RankStore, 'onLoadRank')
    // ,Reflux.listenTo(RankStore, 'onUpdateRank')
  ],
  componentWillMount: function () {
    // RankActions.loadRank(this.props.stack.id, this.props.descriptorCode);
  },
  // onLoadRank: function(rank) {
  //   if (rank.id == this.state.id) {
  //     console.log('Rank setted to : ', rank);
  //     this.setState({rank: rank});
  //   }
  // },
  // onUpdateRank: function(rank) {
  //   console.log('Rank updated')
  //   this.setState({rank: rank});
  // },
  getInitialState: function() {
    return {
      rank: this.props.rank,
      selected: false,
      editable: false
    };
  },
  handleClick: function(e) {
    if (!this.state.editable) {
      this.setState({selected : !this.state.selected});
    }
  },
  handleDoubleClick: function(e) {
    this.setState({editable : !this.state.editable});
    this.setState({selected : false});
  },
  handleCommentSubmit: function(value) {
    TableActions.updateTableRank(this.state.rank, value);
    this.setState({selected : false});
    this.setState({editable : false});
  },
  render: function() {
    var ranking = this.state.rank ? this.state.rank.value : 0;
    if (this.state.editable) {
      ranking = <RankForm key={this.state.rank.id} value={this.state.rank.value} onRankSubmit={this.handleCommentSubmit} />
    }
    // FIXME
    // var rankClasses = classSet({
    //   'rank--0' : this.state.rank === 0,
    //   'rank--1' : this.state.rank === 1,
    //   'rank--2' : this.state.rank === 2,
    //   'rank--3' : this.state.rank === 3,
    //   'rank--4' : this.state.rank === 4,
    //   'rank--5' : this.state.rank === 5,
    //   'rank--selected': this.state.selected
    // });
    var rankCurrent = this.state.rank ? this.state.rank.value : 0;
    var rankClasses = 'rank--' + this.state.rank.value;
    // var rankCurrent = this.state.rank ? this.state.rank.value : 0;
    // var rankClasses = 'rank--' + rankCurrent;
    if (this.state.selected) {
      rankClasses += ' rank--selected';
    }

    return (
      <div className="rank-container">
        <div className={rankClasses} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} >
          {ranking}
        </div>
      </div>
    );
  }
});

module.exports = Rank;