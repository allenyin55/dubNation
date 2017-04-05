import * as types from '../actions/actionTypes';

const initialState = {
  standings: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.getStandings:
      return {...state, standings: action.payload.data}
    default:
      return state;
  }
}