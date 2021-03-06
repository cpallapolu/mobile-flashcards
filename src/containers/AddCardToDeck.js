import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import TextButton from '../components/TextButton';
import { purple, white, red, black, gray, green } from '../utils/colors';

import { addCardToDeck } from '../state/api';
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
    marginBottom: 40,
    marginTop: 40
  },
  questionText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  questionInput: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  }
});

class AddCardToDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }
  }

  state = {
    question: '',
    answer: ''
  }

  handleSubmit = () => {
    const { question, answer } = this.state;
    const { dispatch } = this.props;
    const { title } = this.props.navigation.state.params;

    addCardToDeck(title, { question, answer })
      .then(() => {
        this.handleCancel();
      });
  };

  handleCancel = () => {
    const { title } = this.props.navigation.state.params;

    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home'}),
        NavigationActions.navigate({ routeName: 'DeckView', params: { title } })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View style={styles.root}>
        <View style={styles.questionText}>
          <Text style={{fontSize: Platform.OS === 'ios' ? 40 : 20}}>
            {'Question for the card?'}
          </Text>
        </View>
        <TextInput
          style={styles.questionInput}
          onChangeText={question => this.setState({ question })}
          value={question}
          placeholder={'Question'}
        />
        <View style={styles.questionText}>
          <Text style={{fontSize: Platform.OS === 'ios' ? 40 : 20}}>
            {'Answer for the card?'}
          </Text>
        </View>
        <TextInput
          style={styles.questionInput}
          onChangeText={answer => this.setState({ answer })}
          value={answer}
          placeholder={'Answer'}
        />
        <View style={styles.btns}>
          <TextButton
            style={{backgroundColor: black}}
            onPress={this.handleSubmit}
            disabled={!(question.length && answer.length)}>
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

export default connect()(AddCardToDeck);
