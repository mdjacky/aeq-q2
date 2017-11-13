import { combineReducers } from 'redux';
import { AutobotList, DeceptionList } from './reducer_active_transformers';
import battleResult from './reducer_active_result';

const rootReducer = combineReducers({
  autobots: AutobotList,
  deceptions: DeceptionList,
  battleResult: battleResult
});

export default rootReducer;