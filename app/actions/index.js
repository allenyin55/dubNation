import * as types from "./actionTypes";
import axios from 'axios';

const BOX_SCORE_URL = "http://data.nba.com/data/10s/json/cms/noseason/game"
const ALLEN_NBA_URL = "https://allen-nba-api.herokuapp.com/api";
const ALLEN_NBA_URL_DEV =  "http://localhost:3000/api";

export function getStandings() {
    const request = axios.get(`${ALLEN_NBA_URL}/standings`);

    return{
        type: types.getStandings,
        payload: request
    }
}

export function getGames() {
    function getLastGames(){ return axios.get(`${ALLEN_NBA_URL}/games/last`); }
    function getTodayGames(){ return axios.get(`${ALLEN_NBA_URL}/games`); }
    function getNextGames(){ return axios.get(`${ALLEN_NBA_URL}/games/next`); }

    const request = axios.all([getLastGames(), getTodayGames(), getNextGames()]);

    return{
        type: types.getGames,
        payload: request
    }
}

export function getBoxscore(lastGame, todayGame) {
    function getLastGameBoxscore(){ 
      return axios.get(`${BOX_SCORE_URL}/${lastGame.date}/${lastGame.id}/boxscore.json`)}
    function getTodayGameBoxscore(){ 
      return axios.get(`${BOX_SCORE_URL}/${todayGame.date}/${todayGame.id}/boxscore.json`)}

    const request = axios.all([getLastGameBoxscore(), getTodayGameBoxscore()]);
    

    return{
        type: types.getBoxscore,
        payload: request
    }
}

export function getTweets(){
  const request = axios.get(`${ALLEN_NBA_URL}/tweets`)

  return{
    type: types.getTweets,
    payload: request
  }
}

