
import { AsyncStorage } from 'react-native';
import _ from 'lodash';

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

const DECKS = 'MobileFlashcards:decks';

export async function fetchDecks() {
  let decks = await AsyncStorage.getItem(DECKS);

  decks = JSON.parse(decks);

  if (!decks) {
    decks = defaultDecks;

    AsyncStorage.setItem(DECKS, JSON.stringify(decks));
  }

  return decks;
};

export async function fetchDeck(title) {
  let decks = await fetchDecks();

  return decks[title];
}

export async function saveDeckTitle(title) {
  const decks = await fetchDecks();

  const newDecks = _.assign({}, decks, { [title]: { title, questions: [] } });

  AsyncStorage.setItem(DECKS, JSON.stringify(newDecks));

  return newDecks;
}

export async function addCardToDeck(title, card) {
  const decks = await fetchDecks();

  const deck = decks[title];
  deck.questions.push(card);

  const newDecks = _.assign({}, decks, { [title]: deck });

  AsyncStorage.setItem(DECKS, JSON.stringify(decks));
}
