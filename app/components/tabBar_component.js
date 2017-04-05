import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { TabBar } from "antd-mobile";
import GamesTabsView from '../components/gamesTabs_component';
import StandingsTabsView from '../components/standingsTabs_component';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import teamMap from '../utils/team-map'

export default class TabBarView extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'gamesTab',
      hidden: false,
    };
    
    let teamMapById = {}
    for (let key in teamMap) {
      teamMapById[teamMap[key].id] = Object.assign({}, teamMap[key], {abbr: key})
    }
    this.teamMapById = teamMapById;

  }

  render(){
    return(
      /*<ScrollableTabView
        locked={true}
        tabBarPosition="bottom"
        tabBarBackgroundColor="#003366"
        tabBarInactiveTextColor="white"
        tabBarActiveTextColor="gold"
        tabBarUnderlineStyle={{ backgroundColor: "gold" }}>
        <GamesTabsView tabLabel="Games" {...this.props} />
        <StandingsTabsView tabLabel="Standings" 
                           standings={this.props.standings} 
                           teamMapById={this.teamMapById}/>
      </ScrollableTabView>  */
      <TabBar
        unselectedTintColor="#949494"
        tintColor="gold"
        barTintColor="#003366"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="Games"
          key="Games"
          selected={this.state.selectedTab === 'gamesTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'gamesTab',
            });
          }}
          data-seed="logId"
        >
         <GamesTabsView {...this.props}/>
        </TabBar.Item>
        <TabBar.Item
          title="Standings"
          key="Standings"
          selected={this.state.selectedTab === 'standingsTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'standingsTab',
            });
          }}
          data-seed="logId"
        >

          <StandingsTabsView standings={this.props.standings} 
                             teamMapById={this.teamMapById}/>
        </TabBar.Item>
      </TabBar>
    )
  }
}