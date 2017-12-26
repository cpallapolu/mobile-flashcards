
import _ from 'lodash';

import { RECEIVE_DECKS, GET_DECK, GET_DECKS } from '../actions';

const initialState = {
  activeDeck: {},
  decks: {}
};

export default function decks(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: action.decks
      };
      case GET_DECKS:
        return {
          ...state
        }
      case GET_DECK:

        return {
          ...state,
          activeDeck: action.deck
        };
    default:
      return state;

  }
}
