'use strict'

import React, { Component } from 'React';
import {
  PropTypes,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ListView,
  Dimensions,
  ScrollView,
} from 'react-native';

import teamMap from '../utils/team-map';
import { WhiteSpace } from 'antd-mobile';

const listHeight = Dimensions.get('window').height - 100 - 45

export default class Standings extends Component {

  renderRow (item, _, index) {
    const team = Object.assign({}, this.props.teamMapById[item.id], item)
    const itemStyle = index % 2 === 0 ? styles.item : [styles.item, styles.itemEven]

    const teamLogo = teamMap[team.abbr].logo

    return (
      <TouchableHighlight onPress={() => console.log("ya")} underlayColor='#e5f3ff'>
        <View style={itemStyle}>
          <View style={styles.order}>
            <Text style={styles.orderLabel}>{parseInt(index, 10) + 1}</Text>
          </View>
          <View style={styles.team}>
            <Text style={styles.teamCity}>{team.city}</Text>
            <Text style={styles.teamName}>{team.team}</Text>
          </View>
          <View style={styles.standing}>
            <Text style={styles.standingLabel}>{team.team_stats.wins + ' - ' + team.team_stats.losses}</Text>
          </View>
          <View style={styles.logo}>
            <Image style={styles.logoImage} source={teamLogo} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render () {

    const { conf } = this.props
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }).cloneWithRows(conf)

    return (
      <View>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
          enableEmptySections={true} 
          renderFooter={()=>{return <View style={{height: 50}}></View>}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
 // List
  listView: {
    height: listHeight
  },
  // item
  item: {
    height: 70,
    flex: 1,
    flexDirection: 'row'
  },
  itemEven: {
    backgroundColor: '#F4F4F4'
  },
  // order
  order: {
    alignSelf: 'center',
    width: 50
  },
  orderLabel: {
    color: '#6B7C96',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  // team
  team: {
    flex: 5,
    justifyContent: 'center'
  },
  teamCity: {
    color: '#6B7C96',
    fontSize: 18,
    fontWeight: '200'
  },
  teamName: {
    color: '#909CAF',
    fontSize: 13
  },
  // Standing
  standing: {
    alignSelf: 'center',
    flex: 3
  },
  standingLabel: {
    color: '#6B7C96',
    textAlign: 'right'
  },
  // Logo
  logo: {
    alignSelf: 'center',
    flex: 3
  },
  logoImage: {
    alignSelf: 'center',
    height: 35,
    width: 35
  }
})