
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native';
import _ from 'lodash';

import Card from '../components/Card';

import { fetchDecks } from '../state/api';
import { receiveDecks } from '../state/actions';

class Decks extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks));
      });
  }

  renderItem = ({item}) => {
    return <Card nav={this.props.navigation} key={item.title} title={item.title} numberOfQuestions={item.questions.length || 0}/>
  }

  render() {
    const { decks } = this.props;
    const decksValues = _.values(decks);

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decksValues}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Decks);
