import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import TextButton from '../components/TextButton';
import { purple, white, red, black, gray } from '../utils/colors';

import { getDeck } from '../state/actions';
import { fetchDeck } from '../state/api';

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center'
  },
  btns: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 40
  },
});

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.entryId
    }
  }

  componentWillMount() {
    const { dispatch, title } = this.props;

    fetchDeck(title)
      .then((deck) => {
        dispatch(getDeck(deck));
      });
  }

  render() {
    const { navigation, deck } = this.props;

    if (!Object.keys(deck).length) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

    return (
      <View style={styles.root}>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
          <Text style={{fontSize: 60}}>
            {deck.title}
          </Text>
          <Text style={{fontSize:36, color: gray}}>
            {deck.questions.length} {'cards'}
          </Text>
        </View>
        <View style={styles.btns}>
          <TextButton
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidAddCardBtn, {backgroundColor: white}]}
              onPress={() => navigation.navigate('AddCardToDeck', { title: deck.title })}>
            <Text style={[styles.btnText, { color: black }]}>Add Card</Text>
          </TextButton>
          <TextButton
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidAddCardBtn, {backgroundColor: black}]}
            onPress={() => navigation.navigate('QuizView', { deck })}>
            <Text style={[styles.btnText, { color: white }]}>Start Quiz</Text>
          </TextButton>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  return {
    deck: state.activeDeck,
    title: navigation.state.params.title
  }
}

export default connect(mapStateToProps)(DeckView);
