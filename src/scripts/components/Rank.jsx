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
  componentWillMount: function () {
  },
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   // FIXME
  //   return /[0, 1, 2, 3, 4, 5,]/.test(parseInt(nextProps.value, 10));
  // },
  getInitialState: function() {
    return {
      rank: this.props.rank
    };
  },
  handleClick: function(e) {
    if (!this.props.editable) {
      TableActions.toggleSelectRank(this.state.rank, !this.props.selected);
      // this.setState({selected : !this.state.selected});
      // this.props.onSelectRank(this.state.rank);
    }
  },
  handleDoubleClick: function(e) {
    TableActions.toggleEditRank(this.state.rank, !this.props.editable);
    // this.setState({editable : !this.state.editable});
    // this.props.onDeselectRanks();
  },
  handleRankSubmit: function(value) {
    TableActions.updateRank(this.state.rank, value);
    // TableActions.toggleEditRank(this.state.rank, !this.props.editable);
    // this.props.onDeselectRanks();
  },
  render: function() {
    var ranking = this.state.rank ? this.state.rank.value : 0;
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
    if (this.props.selected) {
      rankClasses += ' rank--selected';
    }
    var element;
    if (this.props.editable) {
      element = <RankForm key={this.state.rank.id} value={ranking} onRankSubmit={this.handleRankSubmit} />
    } else {
      element = <div className={rankClasses} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} >
                  {ranking}
                </div>     
    }

    return (
      <div className="rank-container">
        {element}
      </div>
    );
  }
});

module.exports = Rank;