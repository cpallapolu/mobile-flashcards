import React, { Component } from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import reducers from './src/state/reducers';

import { purple, white } from './src/utils/colors';

import Decks from './src/containers/Decks';
import DeckView from './src/containers/DeckView';
import NewDeck from './src/containers/NewDeck';
import QuizView from './src/containers/QuizView';
import AddCardToDeck from './src/containers/AddCardToDeck';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  AddCardToDeck: {
    screen: AddCardToDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }} >
          <View style={{ backgroundColor: purple, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={purple} barStyle='light-content' />
          </View>

          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
