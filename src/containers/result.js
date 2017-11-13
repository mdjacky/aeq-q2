import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { calculateResult, clearAll } from '../actions/index';
import style from './result.scss';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }

    this.onShowResult = this.onShowResult.bind(this);
  }

  onShowResult() {
    let { autobots, deceptions } = this.props;
    if(!autobots.length || !deceptions.length) {
      this.setState({ error: 'To show war result, both team should have at least one transformer.' });
      return;
    }
    this.setState({ error:''});

    this.props.calculateResult(this.props.autobots, this.props.deceptions);
  }

  render() {
    let lostTeamSurvivors = '';
    if (this.props.battleResult.lostTeamSurvivors) {
      this.props.battleResult.lostTeamSurvivors.map((survivor, index) => {
        lostTeamSurvivors += (index === 0? survivor.name: `, ${survivor.name}`);
      });
    }

    return (
      <div className="result">
        <button onClick={this.onShowResult} className="btn btn-success">Show Result</button>
        <button onClick={this.props.clearAll} className="btn btn-secondary">Clear All</button>
        <small className="form-text text-danger">{this.state.error}</small>
        <div>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="tag tag-default tag-pill float-xs-right">Battle #: </span>
              {this.props.battleResult.battleNum}
            </li>
            <li className="list-group-item">
              <span className="tag tag-default tag-pill float-xs-right">Winning team: </span>
              {this.props.battleResult.winningTeam}
            </li>
            <li className="list-group-item">
              <span className="tag tag-default tag-pill float-xs-right">Survivors of losing team: </span>
              {lostTeamSurvivors}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    autobots: state.autobots,
    deceptions: state.deceptions,
    battleResult: state.battleResult
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    calculateResult: calculateResult,
    clearAll: clearAll
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);