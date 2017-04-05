import React, { Component } from 'react';
import { Text, View, Image } from "react-native";
import { Tabs, WhiteSpace, Button } from 'antd-mobile';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RenderGame from './gamesDetails_component';

const TabPane = Tabs.TabPane;

class GamesTabsView extends Component {
  
  render() {
    
    return (
      <ScrollableTabView
        initialPage={1}
        tabBarActiveTextColor="#003366"
        tabBarUnderlineStyle={{ backgroundColor: "#003366" }}>
        <RenderGame tabLabel='Last Game' 
                    key="lastGame" 
                    game={this.props.lastGame}
                    standings={this.props.standings}
                    boxscore={this.props.lastGameBoxscore}/>
        <RenderGame tabLabel="Today Game" 
                    key="todayGame" 
                    game={this.props.todayGame}
                    standings={this.props.standings}
                    boxscore={this.props.boxscore}/>
        <RenderGame tabLabel='Next Game'
                    game={this.props.nextGame}
                    tweets={this.props.tweets}
                    standings={this.props.standings}/>
      </ScrollableTabView>    
    );
  }
}
 
export default GamesTabsView;