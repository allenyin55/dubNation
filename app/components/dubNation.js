import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import TabsView from '../components/tabs.js';

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

  render() {

    return (
      <TabsView />
    );
  }
}