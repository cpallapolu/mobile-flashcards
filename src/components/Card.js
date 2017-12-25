
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { gray } from '../utils/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius : Platform.OS === 'ios' ? 16 : 2,
    padding : 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});

class Card extends Component {
  render() {
    const { title, numberOfQuestions, nav } = this.props;

    return (
      <TouchableOpacity style={styles.card} onPress={() => nav.navigate('DeckView', { entryId: title })}>
        <View key={title} >
          <Text style={{fontSize: 20}}>
            {title}
          </Text>
          <Text style={{fontSize:16, color: gray}}>
            {numberOfQuestions} {'cards'}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default connect()(Card);
