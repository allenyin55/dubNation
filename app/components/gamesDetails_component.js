import React, { Component } from 'React'; 
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  PixelRatio,
  Platform } from "react-native";
import teamMap from '../utils/team-map';
import GamePlayers from './gamePlayers_component';
import GameTweets from './gamesTweets_component';

export default class GameDetails extends Component {

  constructor(props){
    super(props);

    this.state = {
      selected: 0,
      homeAbb: props.game.home.abbreviation.toLowerCase(),
      visitorAbb: props.game.visitor.abbreviation.toLowerCase()
    }
  }

  onTeamSelected(team){
    if (team === this.state.visitorAbb){ 
      this.setState({selected: 1})
    }
    else this.setState({selected: 0})
  }

  render(){

    const { game } = this.props;
    const { boxscore } = this.props;
    const { standings } = this.props;

    if (!game.home) return <Text>No Game today</Text>

    const homeAbb = this.state.homeAbb;
    const visitorAbb = this.state.visitorAbb;

    const { period_status } = game.period_time;
    const { game_status } = game.period_time;


    let gameProcess = "";
    let cssType = ''
    let parseTime = period_status.split(" ");
    let startTime = new Date();
    let time = parseTime[0].split(/\:|\-/g)
    let hours = parseInt(time[0]);

    switch (parseInt(game_status)) {
      case 1:
          if (parseTime[1] === "pm") {
              hours += 9;
              startTime.setHours(hours);
              startTime.setMinutes(time[1]);
              gameProcess = startTime.toLocaleTimeString().substring(0, 5) + " " +
                  startTime.toLocaleTimeString().substring(8, 11);
          }
          else if (parseTime[1] === "am") {
              hours -= 3;
              startTime.setHours(hours);
              startTime.setMinutes(time[1]);
              gameProcess = startTime.toLocaleTimeString().substring(0, 5) + " " +
                  startTime.toLocaleTimeString().substring(8, 11);
          }
          cssType = 'Unstart'
          break;
      case 2:
          gameProcess = `Live - Q${game.period_time.period_value} ${game.period_time.game_clock}`;
          cssType = 'Live'
          break;
      case 3:
          gameProcess = "Final";
          cssType = 'Over'
          break;
      default:
          gameProcess = "Bug!";
    }

    let homeStand = ''
    let visitorStand = ''
    let homeStandState = {};
    visitorStandState = {};

    standings.map((team) => {
      if (team.abbreviation.toLowerCase() === homeAbb) homeStandState = team.team_stats
      else if(team.abbreviation.toLowerCase() === visitorAbb) visitorStandState = team.team_stats
    })

    homeStand = homeStandState.wins + ' - ' + homeStandState.losses
    visitorStand = visitorStandState.wins + '-' + visitorStandState.losses

    const homeTeamLogo = teamMap[homeAbb].logo
    const visitorTeamLogo = teamMap[visitorAbb].logo
    
    return(
      <View style={{flex: 1}}>
        <View style={styles.container} >
          <TouchableOpacity  onPress={() => this.onTeamSelected.bind(this)(this.state.homeAbb)} style={styles.team}>
            <View>
              <Image style={styles.teamLogo} source={homeTeamLogo}/>
              <Text style={styles.teamCity}>{teamMap[homeAbb].city}</Text>
              <Text style={styles.teamName}>{teamMap[homeAbb].team}</Text>
              <Text style={styles.standing}>{homeStand}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.gameInfo}>
            <Text style={[styles.infoProcess, styles[`process${cssType}`]]}>{gameProcess}</Text>
            {cssType !== 'Unstart' &&
              <View style={styles.infoScorePanel}>
                <Text style={styles.infoScore}>{game.home.score}</Text>
                <View style={styles.infoDivider} />
                <Text style={styles.infoScore}>{game.visitor.score}</Text>
              </View>
            }
          </View>

          <TouchableOpacity  onPress={() => this.onTeamSelected.bind(this)(this.state.visitorAbb)} style={styles.team}>
            <View>
              <Image style={styles.teamLogo} source={visitorTeamLogo} />
              <Text style={styles.teamCity}>{teamMap[visitorAbb].city}</Text>
              <Text style={styles.teamName}>{teamMap[visitorAbb].team}</Text>
              <Text style={styles.standing}>{visitorStand}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {
          boxscore ? 
          (boxscore[0].players !== "" 
          && <GamePlayers detail={boxscore[`${this.state.selected}`].players} />) 
          : <GameTweets tweets={this.props.tweets}/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    height: 95,
    marginHorizontal: 12,
    marginBottom: 10
  },
  // Team
  team: {
    alignItems: 'center',
    borderRadius: 5,
    flex: 1.5
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginTop: 10
  },
  teamCity: {
    color: '#003366',
    fontSize: 11,
    marginTop: 2
  },
  teamName: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 13,
    position: 'relative',
    top: 0
  },
  // Info
  gameInfo: {
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column'
  },
  infoProcess: {
    color: '#003366',
    fontSize: 10,
    marginTop: 22,
    marginBottom: 3
  },
  processUnstart: {
    fontSize: 22,
    position: 'relative',
    top: 13
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  infoScore: {
    color: '#003366',
    fontWeight: '100',
    fontSize: 12,
    textAlign: 'center',
    width: 50
  },
  infoDivider: {
    backgroundColor: '#003366',
    height: 25,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    width: 2 / PixelRatio.get()
  },
  standing: {
    color: '#003366',
    marginTop: 5
  },
})