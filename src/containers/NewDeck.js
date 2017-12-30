import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import TextButton from '../components/TextButton';
import { purple, white, red, black, gray, green } from '../utils/colors';

import { saveDeckTitle } from '../state/api';
import { receiveDecks } from '../state/actions';

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  btnText: {
    fontSize: 22,
    textAlign: 'center',
    color: white
  },
  btns: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 40
  },
});

class NewDeck extends Component {
  static navigationOptions = {
    title: 'New Deck',
  };

  state = {
    title: ''
  }

  handleSubmit = () => {
    const { title } = this.state;
    const { dispatch } = this.props;

    saveDeckTitle(title)
      .then((decks) => {
        dispatch(receiveDecks(decks));

        const deckViewAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({ routeName: 'DeckView', params: { title }})
          ]
        });

        this.props.navigation.dispatch(deckViewAction);
      });
  };

  handleCancel = () => {
    const { title } = this.state;

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    })
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const { title } = this.state;

    return (
      <View style={styles.root}>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
          <Text style={{fontSize: 40}}>
            {'What is the title of your deck?'}
          </Text>
        </View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 30, marginRight: 30, marginTop: 30}}
          onChangeText={title => this.setState({ title })}
          value={title}
          placeholder={'Title'}
        />
        <View style={styles.btns}>
          <TextButton
            style={{backgroundColor: black}}
            onPress={this.handleSubmit}
            disabled={!title.length}>
            <Text style={[styles.btnText, { color: white }]}>Submit</Text>
          </TextButton>
          <TextButton
            style={{backgroundColor: white}}
            onPress={this.handleCancel}>
            <Text style={[styles.btnText, { color: black }]}>Cancel</Text>
          </TextButton>
        </View>
      </View>
    )
  }
}

export default connect()(NewDeck);
