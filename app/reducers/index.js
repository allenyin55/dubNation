import { combineReducers } from 'redux';
import GameReducer from './gameReducer.js';


const rootReducer = combineReducers({
	games: GameReducer
});

export default rootReducer;