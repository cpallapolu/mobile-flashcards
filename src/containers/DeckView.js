import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: navigation.state.params.entryId
    }
  }
  render() {
      return (
        <View>
          <Text>DeckView</Text>
        </View>
      )
    }

}

export default DeckView;
