import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { deleteTransformer } from '../actions/index';
import style from '../../style/teamList.scss';


class TeamList extends Component {

  render() {
    const teamList = this.props.teamList? this.props.teamList.map((transformer, index) => {
      return (
        <tr key={index}>
          <td>
            {transformer.name}
          </td>
          <td>
            {transformer.strength}
          </td>
          <td>
            {transformer.intelligence}
          </td>
          <td>
            {transformer.speed}
          </td>
          <td>
            {transformer.endurance}
          </td>
          <td>
            {transformer.rank}
          </td>
          <td>
            {transformer.courage}
          </td>
          <td>
            {transformer.firepower}
          </td>
          <td>
            {transformer.skill}
          </td>
          <td>
            <button 
              className="btn btn-secondary"
              onClick={() => this.props.deleteTransformer(transformer) }>
              Delete
            </button>
          </td>
        </tr>
      )
    }) : null;

    return (
      <div className="team-list">
        <h3>{this.props.team}</h3>
        <table className="table table-hover table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Strength</th>
              <th>Intelligence</th>
              <th>Speed</th> 
              <th>Endurance</th>
              <th>Rank</th>
              <th>Courage</th> 
              <th>Firepower</th>
              <th>Skill</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teamList}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teamList: state[ownProps.team],
    team: ownProps.name
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ deleteTransformer: deleteTransformer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
