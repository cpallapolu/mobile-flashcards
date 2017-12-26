
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export const GET_DECKS = 'GET_DECKS';
export function fetchDecks() {
  return {
    type: GET_DECKS,
  };
}

export const GET_DECK = 'GET_DECK';
export function getDeck(deck) {
  return {
    type: GET_DECK,
    deck
  };
}
