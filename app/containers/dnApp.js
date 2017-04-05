'use strict';

import React, {Component} from 'react';
import { Text } from 'react-native'
import { connect } from 'react-redux';
import DubNation from '../components/dubNation_component';
import { getStandings, getGames, getBoxscore, getTweets } from '../actions/index';

class DNApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastGame: {},
      todayGame: {},
      nextGame: {},
      boxscore: [],
      lastGameBoxscore: [],
    }
  }

  getGSWGame(games){
    return games.filter((game) =>{
        if (game.home.abbreviation === "GSW" || game.visitor.abbreviation === "GSW"){
          return game;
        }
      })
  }

  componentDidMount(){
    this.props.getTweets();
    this.props.getStandings();
    this.props.getGames()
    .then((promise)=>{
      const lastGame = this.getGSWGame(promise.payload[0].data)[0];
      const game = this.getGSWGame(promise.payload[1].data)[0];
      const lastGameObj = {"date": lastGame.date, "id": lastGame.id}
      const todayGameObj = {"date": game.date, "id": game.id}
      this.props.getBoxscore(lastGameObj, todayGameObj);
    })
  }

  componentWillReceiveProps(nextProps){
    let todayGame = {};
    if (nextProps.games.todayGames.length !== 0 && Object.keys(this.state.todayGame).length === 0){
      // getGSWGame returns an array of one element, which is the gsw game object
      this.setState({todayGame: this.getGSWGame(nextProps.games.todayGames)[0]})
    }
    if (nextProps.games.lastGames.length !== 0 && Object.keys(this.state.lastGame).length === 0){
      this.setState({lastGame: this.getGSWGame(nextProps.games.lastGames)[0]})
    }
    if (nextProps.games.nextGames.length !== 0 && Object.keys(this.state.nextGame).length === 0){
      this.setState({nextGame: this.getGSWGame(nextProps.games.nextGames)[0]})
    }
    if(Object.keys(nextProps.boxscore).length !== 0){
      const game = nextProps.boxscore.sports_content.game;
      const boxscore = [game.home, game.visitor];
      this.setState({boxscore: boxscore})
    }
    if(Object.keys(nextProps.lastGameBoxscore).length !== 0){
      const game = nextProps.lastGameBoxscore.sports_content.game;
      const boxscore = [game.home, game.visitor];
      this.setState({lastGameBoxscore: boxscore})
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   //only update the component if todayGame and the standings are not empty
  //   if(Object.keys(nextState.todayGame).length !== 0 
  //     && Object.keys(nextProps.standings).length !== 0
  //     && Object.keys(nextProps.boxscore).length === 0){
  //     return true;
  //   }
  //   return false;
  // }

  // componentWillUpdate(nextProps, nextState){
  //   nextProps.getBoxscore(nextState.todayGame.date, nextState.todayGame.id);
  // }

  render() {
    if (this.state.boxscore.length > 0){
      
      return (
        <DubNation standings={this.props.standings} 
                   tweets={this.props.tweets}
                   todayGame={this.state.todayGame} 
                   lastGame={this.state.lastGame}
                   nextGame={this.state.nextGame}
                   boxscore={this.state.boxscore}
                   lastGameBoxscore={this.state.lastGameBoxscore}/>
      );
    }
    return <Text>Loading</Text>
  
  }
}

function mapStateToProps(state){
  return { 
    standings: state.teams.standings,
    games: state.games,
    boxscore: state.games.boxscore,
    lastGameBoxscore: state.games.lastGameBoxscore,
    tweets: state.tweets
   };
}

export default connect(mapStateToProps, { getStandings, getGames, getBoxscore, getTweets })(DNApp);