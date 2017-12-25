
import { AsyncStorage } from 'react-native';

const defaultDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

const DECKS = 'DECKS';

export async function getDecks() {
  let decks = await AsyncStorage.getItem(DECKS);

  decks = JSON.parse(decks);

  if (!decks) {
    decks = defaultDecks;

    AsyncStorage.setItem(DECKS, JSON.stringify(decks));
  }

  return decks;

};
