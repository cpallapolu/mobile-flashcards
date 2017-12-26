
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

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

  render() {
    const { decks } = this.props;

    return (
      <View>
        {
          Object.keys(decks).map((deckKey) => {
            const deck = decks[deckKey];

            return (
              <Card nav={this.props.navigation} key={deck.title} title={deck.title} numberOfQuestions={deck.questions.length || 0}/>
            )
          })
        }
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
