import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addTransformer } from '../actions/index';

class InputTransformer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transformer: this.getInitTransformer(),
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitTransformer() {
    return {
      name: '',
      team: 'autobots',
      strength: 0,
      intelligence: 0,
      speed: 0,
      endurance: 0,
      rank: 0,
      courage: 0,
      firepower: 0,
      skill: 0
    };
  }

  handleChange(event) {
    const transformer = this.state.transformer;

    if (event.target.name !== 'name' && event.target.name !== 'team') {
      transformer[event.target.name] = parseInt(event.target.value);
    } else {
      transformer[event.target.name] = event.target.value;
    }
    
    this.setState({ transformer });
  }

  handleSubmit(event) {
    event.preventDefault();
    const transformer = this.state.transformer;
  
    if(this.checkExist(this.props[transformer.team], transformer)){
      this.setState({ error: 'It looks like the name of your transformer is already in the autobots list.' });
      return;
    }

    this.setState({ error: '' });

    this.props.addTransformer(Object.assign({}, transformer));
    this.setState({ 
      transformer: this.getInitTransformer()
    });
  }

  checkExist(team, transformer) {
    for(let i=0; i<team.length; i++){
      if(team[i].name === transformer.name){
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <form 
        className="input-transformer"
        onSubmit={this.handleSubmit}>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Team</th> 
              <th>Strength</th>
              <th>Intelligence</th>
              <th>Speed</th> 
              <th>Endurance</th>
              <th>Rank</th>
              <th>Courage</th> 
              <th>Firepower</th>
              <th>Skill</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <input
                required
                type='text'
                className="form-control"
                placeholder='Name'
                name='name'
                maxLength='20'
                value={this.state.transformer.name}
                onChange={this.handleChange}/>
            </td>
            <td>
            <select 
              name='team'
              className="form-control"
              required
              value={this.state.transformer.team}
              onChange={this.handleChange}>
              <option defaultValue value='autobots'>Autobots</option>
              <option value='deceptions'>Deceptions</option>
            </select> 
            </td> 
            <td>
              <input 
                value={this.state.transformer.strength} 
                name='strength' 
                className="form-control"
                type='number' 
                required
                min='0' 
                max='10' 
                onChange={this.handleChange}/>
            </td>
            <td>
              <input 
                value={this.state.transformer.intelligence} 
                name='intelligence'
                className="form-control"
                type='number'
                required
                min='0' 
                max='10' 
                onChange={this.handleChange}/>
            </td>
            <td>
              <input 
                value={this.state.transformer.speed} 
                name='speed' 
                type='number'
                required
                className="form-control"
                min='0' 
                max='10' 
                onChange={this.handleChange}/>
            </td>
            <td>
              <input 
                value={this.state.transformer.endurance} 
                name='endurance'
                className="form-control"
                type='number'
                required
                min='0' 
                max='10' 
                onChange={this.handleChange}/>
            </td>
            <td>
              <input 
                value={this.state.transformer.rank} 
                name='rank'
                className="form-control"
                type='number'
                required
                min='0' 
                max='10' 
                onChange={this.handleChange}/>
            </td>
            <td>
              <input 
                value={this.state.transformer.courage} 
                name='courage'
                className="form-control"
                type='number'
                required
                min='0' 
                max='10' 
                onChange={this.handleChange}/>
            </td>
            <td>
              <input 
                value={this.state.transformer.firepower} 
                name='firepower'
                className="form-control"
                type='number'
                required
                min='0' 
                max='10' 
                onChange={this.handleChange}/>
            </td>
            <td>
              <input 
                value={this.state.transformer.skill} 
                name='skill'
                className="form-control"
                type='number'
                required
                min='0' 
                max='10' 
                onChange={this.handleChange}/>
            </td>
          </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-success">Add Transformer</button>
        <small className="form-text text-danger">{this.state.error}</small>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    autobots: state.autobots,
    deceptions: state.deceptions
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addTransformer: addTransformer}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InputTransformer);