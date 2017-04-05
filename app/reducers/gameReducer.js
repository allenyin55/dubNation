import * as types from '../actions/actionTypes';

const initialState = {
  todayGames: [],
  lastGames: [],
  nextGames: [],
  boxscore: {},
  lastGameBoxscore: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.getGames: 
      return {...state, lastGames: action.payload[0].data, 
                        todayGames: action.payload[1].data,
                        nextGames: action.payload[2].data }
    case types.getBoxscore:
      return {...state, lastGameBoxscore: action.payload[0].data,
                        boxscore: action.payload[1].data}
    default:
      return state;
  }
}