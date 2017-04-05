import * as types from '../actions/actionTypes';

const initialState = {
  tweets: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.getTweets:
      return {...state, tweets: action.payload.data}
    default:
      return state;
  }
}