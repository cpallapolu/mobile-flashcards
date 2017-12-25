
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export const GET_DECKS = 'GET_DECKS';
export function getDecks() {
  return {
    type: GET_DECKS,
  };
}
