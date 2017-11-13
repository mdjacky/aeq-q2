import React, { Component } from 'react';

import InputTransformer from '../containers/inputTransformer';
import TeamList from '../containers/teamList';
import Result from '../containers/result';

import style from '../../style/app.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app-transformers">
        <h1>War of Transformers</h1>
        <InputTransformer />
        <TeamList name='Autobots' team='autobots'/>
        <TeamList name='Deceptions' team='deceptions'/>
        <Result />
      </div>
    );
  }
}
