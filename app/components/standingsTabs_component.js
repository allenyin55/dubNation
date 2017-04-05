import React, { Component } from 'react';
import { Text, View, Image } from "react-native"
import { Tabs, WhiteSpace, Button } from 'antd-mobile';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Standings from '../components/standings_component';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}
 
class StandingsTabsView extends Component {

  render() {

    //dividing western and eastern conferences
    let western = [];
    let eastern = [];
    //this.props stores the standings
    this.props.standings.map((data) =>{
      if(this.props.teamMapById[data.id].conf === 'western') western.push(data);
      else if (this.props.teamMapById[data.id].conf === 'eastern') eastern.push(data);
    })

    return (
      <View style={{flex: 1}}>
        <ScrollableTabView 
          tabBarActiveTextColor="#003366"
          tabBarUnderlineStyle={{ backgroundColor: "#003366" }}>
          <View tabLabel="Western" key="1">
            <Standings conf={western} teamMapById={this.props.teamMapById}/>
          </View>
          <View tabLabel="Eastern" key="2">
            <Standings conf={eastern} teamMapById={this.props.teamMapById}/>
          </View>
        </ScrollableTabView>    
      </View>
    );
  }
}
 
export default StandingsTabsView;