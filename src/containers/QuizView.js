
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

import TextButton from '../components/TextButton';
import { purple, white, red, black, gray, green } from '../utils/colors';

import { fetchDeck } from '../state/actions';

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

class QuizView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  state = {
    QorAText: '',
    QorABtn: '',
    currentView: 'question',
    qIndex: 0,
    correct: 0,
    showResults: false,
    socre: '0 %'
  }

  componentWillMount() {
    const deck = this.props.deck;
    const { qIndex } = this.state;

    this.setState({
      QorAText: deck.questions[qIndex].question,
      QorABtn: 'Answer'
    });
  }

  handleQorABtn = () => {
    const deck = this.props.deck;
    const { qIndex, currentView } = this.state;

    this.setState({
      QorAText: currentView === 'question' ? deck.questions[qIndex].question : deck.questions[qIndex].answer,
      QorABtn: currentView === 'question' ? 'Answer' : 'Question',
      currentView: currentView === 'question' ? 'answer' : 'question'
    });
  };

  handleSubmit = (CorIC) => {
    const deck = this.props.deck;
    const { currentView, correct } = this.state;
    let { qIndex } = this.state;

    qIndex += 1;

    this.setState({
      qIndex: qIndex,
      currentView: 'question',
      correct: CorIC === 'correct' ? (correct + 1) : correct
    });

    if (qIndex === deck.questions.length) {
      this.setState({
        showResults: true
      });

      clearLocalNotification().then(setLocalNotification);
    } else {
      this.setState({
        QorAText: deck.questions[qIndex].question,
        QorABtn: 'Answer'
      });
    }
  }

  handleHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { deck } = this.props.navigation.state.params;
    const { QorABtn, QorAText, qIndex, showResults, correct } = this.state;
    const score = `${_.round((correct / deck.questions.length) * 100, 2)} %`;

    if (showResults) {
      return (
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
          <Text style={{fontSize: 50}}>
            Your Test result
          </Text>
          <Text style={{fontSize: 60}}>
            {score}
          </Text>
          <TextButton
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn, {backgroundColor: red}]}
            onPress={this.handleHome}>
            <Text style={[styles.btnText]}>Home</Text>
          </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.root}>
        <View style={{marginTop: 10, marginLeft: 10}}>
          <Text style={{fontSize: 30}}>{qIndex + 1}/{deck.questions.length}</Text>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
          <Text style={{fontSize: 40}}>
            {QorAText}
          </Text>
          <TextButton onPress={this.handleQorABtn}>
            <Text style={{fontSize:36, color: red}}>
              {QorABtn}
            </Text>
          </TextButton>
        </View>
        <View style={styles.btns}>
          <TextButton
            style={{backgroundColor: green}}
            onPress={() => this.handleSubmit('correct')}>
            <Text style={[styles.btnText]}>Correct</Text>
          </TextButton>
          <TextButton
            style={{backgroundColor: red}}
            onPress={() => this.handleSubmit('incorrect')}>
            <Text style={[styles.btnText]}>Incorrect</Text>
          </TextButton>
        </View>
      </View>
    )
  }
};

function mapStateToProps(state, { navigation }) {
  return {
    deck: navigation.state.params.deck
  }
}
export default connect(mapStateToProps)(QuizView);
