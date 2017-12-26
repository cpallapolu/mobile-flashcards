
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import TextButton from '../components/TextButton';
import { purple, white, red, black, gray, green } from '../utils/colors';

import { fetchDeck } from '../state/actions';

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
    showResults: false
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
    const { qIndex, currentView, correct } = this.state;

    this.setState({
      qIndex: qIndex + 1,
      currentView: 'question',
      correct: CorIC === 'correct' ? (correct + 1) : correct
    });

    if (qIndex + 1 === deck.questions.length) {
      this.setState({
        showResults: true
      });
    } else {
      this.setState({
        QorAText: deck.questions[qIndex + 1].question,
        QorABtn: 'Answer'
      });
    }
  }


  render() {
    const { deck } = this.props.navigation.state.params;
    const { QorABtn, QorAText, qIndex, showResults } = this.state;

    if (showResults) {
      return (
        <View>
          <Text>
            Your Test result is: {(this.state.correct / deck.questions.length) * 100} %
          </Text>
        </View>
      )
    }
    return (
      <View style={styles.root}>
        <View style={{marginTop: 10, marginLeft: 10}}>
          <Text style={{fontSize: 30}}>{qIndex + 1}/2</Text>
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
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidAddCardBtn, {backgroundColor: red}]}
            onPress={() => this.handleSubmit('correct')}>
            <Text style={[styles.btnText]}>Correct</Text>
          </TextButton>
          <TextButton
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.androidAddCardBtn, {backgroundColor: green}]}
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
