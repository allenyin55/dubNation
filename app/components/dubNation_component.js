import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, StatusBar, ToolbarAndroid} from 'react-native';
import TabBarView from '../components/tabBar_component';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

export default class DubNation extends Component {
  constructor(props) {
    super(props);
  }

   onActionSelected (position) {
      if (position === 0) { // index of 'Settings'
        showSettings();
      }
   }

  render() {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          style={{height: 56}}
          title="Dub Nation" />
        <TabBarView {...this.props}/>
      </View>
    );
  }
}