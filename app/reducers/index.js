import { combineReducers } from 'redux';
import GameReducer from './gameReducer';
import StandingReducer from './standingReducer';
import TweetReducer from './tweetReducer';


const rootReducer = combineReducers({
	games: GameReducer,
  teams: StandingReducer,
  tweets: TweetReducer
});

export default rootReducer;