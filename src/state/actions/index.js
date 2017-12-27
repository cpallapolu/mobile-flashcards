
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export const GET_DECK = 'GET_DECK';
export function getDeck(deck) {
  return {
    type: GET_DECK,
    deck
  };
}

export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export function saveDeckTitle(title) {
  return {
    type: SAVE_DECK_TITLE,
    title
  }
}
